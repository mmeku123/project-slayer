import React, { Component } from 'react';
import Project from '../../models/Project';
import { simpleProjects } from '../../mocks/projects';

interface ProjectListProps {
  projects: Project[];
  isChooseProject: boolean;
  chooseProject: Project;
  onChangeProject: (project: Project) => void;
}

interface ProjectListState {}

class ProjectCardList extends Component<{
  projects: Project[];
  onProjectChange: (project: Project) => void;
}> {
  constructor(props) {
    super(props);
  }

  handleChangeProject = (event, project: Project) => {
    console.log(event);
    this.props.onProjectChange(project);
  };

  render() {
    return this.props.projects.map(project => {
      return (
        <button
          onClick={event => this.handleChangeProject(event, project)}
          key={project.name}
        >
          {project.name}
        </button>
      );
    });
  }
}

class ProjectList extends Component<ProjectListProps, ProjectListState> {
  constructor(props: ProjectListProps) {
    super(props);
    this.state = {};
  }

  handleChooseProjectChange = (project: Project) => {
    this.props.onChangeProject(project);
  };

  render() {
    let projects = this.props.projects;
    let project = this.props.chooseProject;

    return (
      <div>
        <div>Your Project is: {project.name}</div>
        <div>Detail: {project.detail}</div>

        <ProjectCardList
          projects={projects}
          onProjectChange={this.handleChooseProjectChange}
        />
      </div>
    );
  }
}

export default ProjectList;
