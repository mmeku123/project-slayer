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
  deleteSubject
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
import { Button, Row, Col, Icon, Spin, Divider, Popconfirm } from 'antd';
import Text from 'antd/lib/typography/Text';

interface IProjectManagementStates {
  isFetchSubjectDone: boolean;
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
    this.state = { isFetchSubjectDone: false };
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
    this.setState({ isFetchSubjectDone: true });
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

  renderSubjectActions = () => {
    return (
      <Row type="flex" justify="end">
        <Col>
          <Button
            shape="circle"
            size="large"
            style={{ margin: '10px', border: 'transparent' }}
            onClick={() => {
              console.log('edit subject');
            }}
          >
            <Icon style={{ fontSize: '24px' }} type="setting" />
          </Button>

          <Popconfirm
            placement="topRight"
            title={confirmDeleteText}
            onConfirm={this.handleDeleteSubject}
          >
            <Button
              shape="circle"
              size="large"
              style={{ margin: '10px', border: 'transparent' }}
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
            style={{ margin: '10px', border: 'transparent' }}
            onClick={() => {
              console.log('edit project');
            }}
          >
            <Icon style={{ fontSize: '24px' }} type="setting" />
          </Button>

          <Popconfirm
            placement="topRight"
            title={confirmDeleteProjectText}
            onConfirm={this.handleDeleteProject}
          >
            <Button
              shape="circle"
              size="large"
              style={{ margin: '10px', border: 'transparent' }}
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
      deleteSubject
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectManagement));
