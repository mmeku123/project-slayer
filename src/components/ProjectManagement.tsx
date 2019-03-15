import React, { Component } from 'react';
import Subject from '../models/Subject';
import Project from '../models/Project';

import SubjectList from './Subject/SubjectList';
import ProjectList from './Project/ProjectList';

import subjects from '../mocks/subjects';

interface IProjectManagementProps {}

interface IProjectManagementStates {
  subject: {
    list: Subject[];
    choose: Subject;
    isChoose: boolean;
  };
  project: {
    list: Project[];
    choose: Project;
    isChoose: boolean;
  };
}

class ProjectManagement extends Component<
  IProjectManagementProps,
  IProjectManagementStates
> {
  constructor(props) {
    super(props);
    this.state = {
      subject: {
        list: subjects,
        choose: subjects[0],
        isChoose: true
      },
      project: {
        list: subjects[0].projects,
        choose: subjects[0].projects[0],
        isChoose: true
      }
    };
  }

  handleSubjectChange = (subject: Subject) => {
    this.setState(state => ({
      subject: {
        list: state.subject.list,
        choose: subject,
        isChoose: true
      },
      project: {
        list: subject.projects,
        choose: subject.projects[0],
        isChoose: true
      }
    }));
  };

  handleProjectChange = (project: Project) => {
    this.setState(state => ({
      project: {
        list: state.project.list,
        choose: project,
        isChoose: true
      }
    }));
  };

  render() {
    let subject = this.state.subject;
    let project = this.state.project;

    return (
      <div>
        <SubjectList
          subjects={subject.list}
          chooseSubject={subject.choose}
          isChooseSubject={subject.isChoose}
          onChangeSubject={this.handleSubjectChange}
        />

        <ProjectList
          projects={project.list}
          chooseProject={project.choose}
          isChooseProject={project.isChoose}
          onChangeProject={this.handleProjectChange}
        />
      </div>
    );
  }
}

export default ProjectManagement;
