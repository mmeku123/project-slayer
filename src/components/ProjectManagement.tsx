import React, { Component } from 'react';
import Subject from '../models/Subject';
import Project from '../models/Project';

import SubjectList from './Subject/SubjectList';
import ProjectList from './Project/ProjectList';
import ProjectThing from './Project/ProjectThing';

import subjects from '../mocks/subjects';
import { simpleProjects, simpleProjects2 } from '../mocks/projects';
import { student, student2 } from '../mocks/students';
import { simpleComment, simpleComment2 } from '../mocks/comments';

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

  handleSubjectCreate = (subjectName: string) => {
    let newSubject = new Subject(subjectName, subjectName);
    newSubject.projects = simpleProjects;
    this.state.subject.list.push(newSubject);
    this.setState({});
  };

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

  handleProjectCreate = (projectName: string) => {
    let newProject = new Project(projectName);
    newProject.comments = [simpleComment];
    newProject.detail = 'project1';
    newProject.members = [student, student2];
    newProject.addProjectTaskByMember();
    this.state.project.list.push(newProject);
    this.setState({});
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
          onCreateSubject={this.handleSubjectCreate}
        />

        <ProjectList
          projects={project.list}
          chooseProject={project.choose}
          isChooseProject={project.isChoose}
          onChangeProject={this.handleProjectChange}
          onCreateProject={this.handleProjectCreate}
        />

        <ProjectThing project={project.choose} />
      </div>
    );
  }
}

export default ProjectManagement;
