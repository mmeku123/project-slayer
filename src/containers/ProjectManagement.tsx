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

import SubjectList from '../components/Subject/SubjectList';
import ProjectList from '../components/Project/ProjectList';
import ProjectThing from '../components/Project/ProjectThing';

import ProjectHeader from '../components/Project/ProjectHeader';
import { bindActionCreators } from 'redux';
import { Student } from '../models';
import { Redirect } from 'react-router';
import { Button } from 'antd';

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

  render() {
    let { subjects, focusSubject, isFocusSubject } = this.props.subjects;
    let { projects, focusProject, isFocusProject } = this.props.projects;

    if (this.state.isFetchSubjectDone == true) {
      this.props.fetchProjectByIds(this.props.subjects.focusSubject.projectIds);
      this.setState({ isFetchSubjectDone: false });
    }

    return (
      <div>
        {this.props.subjects.isLoading ? (
          <div>Loading</div>
        ) : (
          <div>
            <SubjectList
              subjects={subjects}
              chooseSubject={focusSubject}
              isChooseSubject={isFocusSubject}
              onChangeSubject={this.handleSubjectChange}
              onCreateSubject={this.handleSubjectCreate}
            />
          </div>
        )}

        {isFocusSubject ? (
          <div>
            <Button type="danger" onClick={this.handleDeleteSubject}>
              Delete This Subject
            </Button>

            <ProjectList
              projects={projects}
              chooseProject={focusProject}
              isChooseProject={isFocusProject}
              onChangeProject={this.handleProjectChange}
              onCreateProject={this.handleProjectCreate}
            />

            {isFocusProject ? (
              <div>
                <ProjectHeader project={focusProject} />
                <ProjectThing project={focusProject} subject={focusSubject} />

                <Button type="danger" onClick={this.handleDeleteProject}>
                  Delete This Project
                </Button>
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
)(ProjectManagement);
