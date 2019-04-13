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

import ProjectHeader from '../components/Project/ProjectHeader';
import { bindActionCreators } from 'redux';
import { Student } from '../models';
import { Redirect, withRouter } from 'react-router';
import { Button, Row, Col, Icon, Spin } from 'antd';
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
  createSubject: (subjectName: string) => void;
  createProject: (projectName: string, subjectId: string) => void;
  changeSubject: (subjectId: string) => (dispatch: any) => void;
  changeProject: (projectId: string) => void;
  changeProjectBySubject: (subject: Subject) => void;
  deleteProject: (projectId: string, subjectId: string) => void;
  deleteSubject: (subjectId: string) => void;
  history;
}

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

  handleSubjectCreate = (subjectName: string) => {
    this.props.createSubject(subjectName);
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

          <Button
            shape="circle"
            size="large"
            style={{ margin: '10px', border: 'transparent' }}
            onClick={this.handleDeleteSubject}
          >
            <Icon style={{ fontSize: '24px' }} type="delete" />
          </Button>
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

          <Button
            shape="circle"
            size="large"
            style={{ margin: '10px', border: 'transparent' }}
            onClick={this.handleDeleteProject}
          >
            <Icon style={{ fontSize: '24px' }} type="delete" />
          </Button>
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
      <div>
        <div>
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
            {this.renderSubjectActions()}

            <ProjectSection
              projects={projects}
              chooseProject={focusProject}
              isChooseProject={isFocusProject}
              onChangeProject={this.handleProjectChange}
              onCreateProject={this.handleProjectCreate}
            />

            {isFocusProject ? (
              <div>
                {this.renderProjectActions()}

                <ProjectHeader project={focusProject} />
                <ProjectThing project={focusProject} subject={focusSubject} />
              </div>
            ) : (
              <div />
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
