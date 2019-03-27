import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createSubject,
  createProject,
  changeSubject,
  changeProject,
  fetchProjectByIds,
  fetchSubject,
  changeProjectBySubject
} from '../actions';

import DocumentData from 'firebase/firebase-firestore';
import Subject from '../models/Subject';
import Project from '../models/Project';

import SubjectList from './Subject/SubjectList';
import ProjectList from './Project/ProjectList';
import ProjectThing from './Project/ProjectThing';

import ProjectHeader from './Project/ProjectHeader';
import { bindActionCreators } from 'redux';

interface IProjectManagementStates {
  isFetchSubjectDone: boolean;
}
interface IProjectManagementProps {
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
  fetchSubject: () => (dispatch: any) => Promise<void>;
  createSubject: (subjectName: string) => void;
  createProject: (projectName: string, subjectId: string) => void;
  changeSubject: (subjectId: string) => (dispatch: any) => void;
  changeProject: (projectId: string) => void;
  changeProjectBySubject: (subject: Subject) => void;
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
  };

  handleProjectEdit = (editProject: Project) => {};

  render() {
    let { subjects, focusSubject, isFocusSubject } = this.props.subjects;
    let { projects, focusProject, isFocusProject } = this.props.projects;

    console.log(isFocusSubject);

    if (this.state.isFetchSubjectDone == true) {
      this.props.fetchProjectByIds(this.props.subjects.focusSubject.projectIds);
      this.setState({ isFetchSubjectDone: false });
    }

    {
      this.props.subjects.isLoading
        ? console.log(subjects)
        : console.log(subjects);
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
            <ProjectList
              projects={projects}
              chooseProject={focusProject}
              isChooseProject={isFocusProject}
              onChangeProject={this.handleProjectChange}
              onCreateProject={this.handleProjectCreate}
              onEditProject={this.handleProjectEdit}
            />

            {isFocusProject ? (
              <div>
                <ProjectHeader project={focusProject} />
                <ProjectThing project={focusProject} />
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
      fetchSubject
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectManagement);
