import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createSubject,
  createProject,
  changeSubject,
  changeProject,
  fetchProjectByIds,
  fetchSubject,
  changeProjectBySubject,
  fetchProjectMembers,
  fetchTasks,
  deleteProject,
  deleteSubject,
  updateSubjectImage,
  updateProjectImage
} from '../actions';

import DocumentData from 'firebase/firebase-firestore';
import Subject from '../models/Subject';
import Project from '../models/Project';

import SubjectSection from '../components/Subject/SubjectSection';
import ProjectSection from '../components/Project/ProjectSection';
import ProjectThing from '../components/Project/ProjectThing';

import ProjectTitle from '../components/Project/ProjectTitle';
import { bindActionCreators } from 'redux';
import { Student } from '../models';
import { Redirect, withRouter } from 'react-router';
import {
  Button,
  Row,
  Col,
  Icon,
  Spin,
  Divider,
  Popconfirm,
  Modal,
  Card
} from 'antd';
import Text from 'antd/lib/typography/Text';
import ProjectIcons from '../images/project';
import SubjectIcons from '../images/subject';

interface IProjectManagementStates {
  isFetchSubjectDone: boolean;
  isEditSubjectVisible: boolean;
  isEditProjectVisible: boolean;
  subjectImg: string;
  projectImg: string;
}
interface IProjectManagementProps {
  auth: { user: Student; isAuth: boolean; authId: string };
  subjects: {
    subjects: Subject[];
    focusSubject: Subject;
    isFocusSubject: boolean;
    isLoading: boolean;
  };
  projects: {
    projects: Project[];
    focusProject: Project;
    isFocusProject: boolean;
    isLoading: boolean;
  };
  fetchProjectByIds: (projectIds: string[]) => (dispatch: any) => Promise<void>;
  fetchProjectMembers: (projectId) => void;
  fetchTasks: (projectId) => void;
  fetchSubject: () => (dispatch: any) => Promise<void>;
  createSubject: (subject: Subject) => void;
  createProject: (projectName: string, subjectId: string) => void;
  changeSubject: (subjectId: string) => (dispatch: any) => void;
  changeProject: (projectId: string) => void;
  changeProjectBySubject: (subject: Subject) => void;
  deleteProject: (projectId: string, subjectId: string) => void;
  deleteSubject: (subjectId: string) => void;
  updateSubjectImage: (subject: Subject, path: string) => void;
  updateProjectImage: (
    project: Project,
    subjectId: string,
    path: string
  ) => void;
  history;
}

const confirmDeleteText = 'Are you sure to delete this subject?';
const confirmDeleteProjectText = 'Are you sure to delete this project?';

class ProjectManagement extends Component<
  IProjectManagementProps,
  IProjectManagementStates
> {
  constructor(props) {
    super(props);
    this.state = {
      subjectImg: SubjectIcons[0],
      projectImg: ProjectIcons[0],
      isFetchSubjectDone: false,
      isEditProjectVisible: false,
      isEditSubjectVisible: false
    };
  }

  componentWillMount() {
    if (!this.props.auth.isAuth) this.props.history.push('/signin');
    this.props.fetchSubject();
  }

  handleSubjectCreate = (subject: Subject) => {
    this.props.createSubject(subject);
  };

  handleSubjectChange = (subject: Subject) => {
    this.props.changeSubject(subject._id);
    this.setState({
      isFetchSubjectDone: true
    });
  };

  handleProjectCreate = (projectName: string) => {
    this.props.createProject(projectName, this.props.subjects.focusSubject._id);
  };

  handleProjectChange = (project: Project) => {
    this.props.changeProject(project._id);
    this.props.fetchProjectMembers(project._id);
    this.props.fetchTasks(project._id);
  };

  handleDeleteSubject = () => {
    this.props.deleteSubject(this.props.subjects.focusSubject._id);
  };

  handleDeleteProject = () => {
    this.props.deleteProject(
      this.props.projects.focusProject._id,
      this.props.subjects.focusSubject._id
    );
  };

  showEditSubject = () => {
    this.setState({ isEditSubjectVisible: true });
  };

  handleConfirmEditSubject = () => {
    this.props.updateSubjectImage(
      this.props.subjects.focusSubject,
      this.state.subjectImg
    );

    this.setState({ isEditSubjectVisible: false });
  };

  handleCancelEditSubject = () => {
    this.setState({ isEditSubjectVisible: false });
  };

  handleChangeSubjectIcon = imgPath => {
    this.setState({ subjectImg: imgPath });
  };

  renderSubjectIconList = () => {
    return (
      <div>
        {SubjectIcons.map(image => {
          return (
            <Button
              key={image}
              style={{ width: '100px', height: '100px' }}
              onClick={() => this.handleChangeSubjectIcon(image)}
            >
              <img alt="subject image" src={image} />
            </Button>
          );
        })}
      </div>
    );
  };

  showEditProject = () => {
    this.setState({ isEditProjectVisible: true });
  };

  handleConfirmEditProject = () => {
    this.props.updateProjectImage(
      this.props.projects.focusProject,
      this.props.subjects.focusSubject._id,
      this.state.projectImg
    );
    this.setState({ isEditProjectVisible: false });
  };

  handleCancelEditProject = () => {
    this.setState({ isEditProjectVisible: false });
  };

  handleChangeProjectIcon = imgPath => {
    this.setState({ projectImg: imgPath });
  };

  renderProjectIconList = () => {
    return (
      <div>
        {ProjectIcons.map(image => {
          return (
            <Button
              key={image}
              style={{ width: '100px', height: '100px' }}
              onClick={() => this.handleChangeProjectIcon(image)}
            >
              <img alt="project image" src={image} />
            </Button>
          );
        })}
      </div>
    );
  };

  renderSubjectActions = () => {
    return (
      <Row type="flex" justify="end">
        <Col>
          <Button
            shape="circle"
            size="large"
            style={{ margin: '10px', lineHeight: '0em' }}
            onClick={() => this.showEditSubject()}
          >
            <Icon style={{ fontSize: '24px' }} type="setting" />
          </Button>

          <Modal
            title="Subject Setting"
            visible={this.state.isEditSubjectVisible}
            onOk={this.handleConfirmEditSubject}
            onCancel={this.handleCancelEditSubject}
          >
            {this.renderSubjectIconList()}
          </Modal>

          <Popconfirm
            placement="topRight"
            title={confirmDeleteText}
            onConfirm={this.handleDeleteSubject}
          >
            <Button
              shape="circle"
              size="large"
              style={{ margin: '10px', lineHeight: '0em' }}
            >
              <Icon style={{ fontSize: '24px' }} type="delete" />
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    );
  };

  renderProjectActions = () => {
    return (
      <Row type="flex" justify="end">
        <Col>
          <Button
            shape="circle"
            size="large"
            style={{ margin: '10px', lineHeight: '0em' }}
            onClick={() => {
              this.showEditProject();
            }}
          >
            <Icon style={{ fontSize: '24px' }} type="setting" />
          </Button>

          <Modal
            title="Project Setting"
            visible={this.state.isEditProjectVisible}
            onOk={this.handleConfirmEditProject}
            onCancel={this.handleCancelEditProject}
          >
            {this.renderProjectIconList()}
          </Modal>

          <Popconfirm
            placement="topRight"
            title={confirmDeleteProjectText}
            onConfirm={this.handleDeleteProject}
          >
            <Button
              shape="circle"
              size="large"
              style={{ margin: '10px', lineHeight: '0em' }}
            >
              <Icon style={{ fontSize: '24px' }} type="delete" />
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    );
  };

  render() {
    let { subjects, focusSubject, isFocusSubject } = this.props.subjects;
    let { projects, focusProject, isFocusProject } = this.props.projects;

    if (this.state.isFetchSubjectDone == true) {
      this.props.fetchProjectByIds(this.props.subjects.focusSubject.projectIds);
      this.setState({ isFetchSubjectDone: false });
    }

    return (
      <div className="container">
        <div style={{ padding: '30px' }}>
          <SubjectSection
            subjects={subjects}
            chooseSubject={focusSubject}
            isLoading={this.props.subjects.isLoading}
            isChooseSubject={isFocusSubject}
            onChangeSubject={this.handleSubjectChange}
            onCreateSubject={this.handleSubjectCreate}
          />
        </div>

        {isFocusSubject ? (
          <div>
            <div style={{ padding: '30px' }}>
              {this.renderSubjectActions()}
              <Divider />

              <ProjectSection
                projects={projects}
                chooseProject={focusProject}
                isChooseProject={isFocusProject}
                onChangeProject={this.handleProjectChange}
                onCreateProject={this.handleProjectCreate}
              />
            </div>

            {isFocusProject ? (
              <div>
                {this.renderProjectActions()}
                <Divider />

                <ProjectTitle project={focusProject} />
                <ProjectThing project={focusProject} subject={focusSubject} />

                <Divider />
              </div>
            ) : (
              <Divider />
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    subjects: state.subjects,
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createSubject,
      createProject,
      changeSubject,
      changeProject,
      changeProjectBySubject,
      fetchProjectByIds,
      fetchSubject,
      fetchProjectMembers,
      fetchTasks,
      deleteProject,
      deleteSubject,
      updateSubjectImage,
      updateProjectImage
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectManagement));
