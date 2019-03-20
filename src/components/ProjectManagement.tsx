import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createSubject,
  createProject,
  changeSubject,
  changeProject,
  changeProjectBySubject
} from '../actions';
import Subject from '../models/Subject';
import Project from '../models/Project';

import SubjectList from './Subject/SubjectList';
import ProjectList from './Project/ProjectList';
import ProjectThing from './Project/ProjectThing';

import ProjectHeader from './Project/ProjectHeader';
import { bindActionCreators } from 'redux';

interface IProjectManagementProps {
  subjects: {
    subjects: Subject[];
    focusSubject: Subject;
    isFocusSubject: boolean;
  };
  projects: {
    projects: Project[];
    focusProject: Project;
    isFocusProject: boolean;
  };
  createSubject: (subjectName: string) => void;
  createProject: (projectName: string) => void;
  changeSubject: (subjectName: string) => void;
  changeProject: (projectName: string) => void;
  changeProjectBySubject: (subject: Subject) => void;
}

class ProjectManagement extends Component<IProjectManagementProps> {
  constructor(props) {
    super(props);
  }

  handleSubjectCreate = (subjectName: string) => {
    this.props.createSubject(subjectName);
  };

  handleSubjectChange = (subject: Subject) => {
    this.props.changeSubject(subject.name);

    this.props.changeProjectBySubject(subject);
  };

  handleProjectCreate = (projectName: string) => {
    this.props.createProject(projectName);
  };

  handleProjectChange = (project: Project) => {
    this.props.changeProject(project.name);
  };

  handleProjectEdit = (editProject: Project) => {};

  render() {
    let { subjects, focusSubject, isFocusSubject } = this.props.subjects;
    let { projects, focusProject, isFocusProject } = this.props.projects;

    console.log(focusProject);

    return (
      <div>
        <SubjectList
          subjects={subjects}
          chooseSubject={focusSubject}
          isChooseSubject={isFocusSubject}
          onChangeSubject={this.handleSubjectChange}
          onCreateSubject={this.handleSubjectCreate}
        />

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
  console.log(state);
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
      changeProjectBySubject
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectManagement);
