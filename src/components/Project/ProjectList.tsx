import React, { Component } from 'react';
import Project from '../../models/Project';
import { simpleProjects } from '../../mocks/projects';

interface ProjectListProps {}

interface ProjectListState {
  isChooseProject: boolean;
  chooseProject: Project;
}

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
        <button onClick={event => this.handleChangeProject(event, project)}>
          {project.name}
        </button>
      );
    });
  }
}

class ProjectList extends Component<ProjectListProps, ProjectListState> {
  constructor(props: {}) {
    super(props);
    this.state = { isChooseProject: false, chooseProject: simpleProjects[0] };
  }

  handleChooseProjectChange = (project: Project) => {
    this.setState({ chooseProject: project });
  };

  render() {
    let project = this.state.chooseProject;

    return (
      <div>
        <div>Your Project is: {project.name}</div>
        <div>Detail: {project.detail}</div>

        <ProjectCardList
          projects={simpleProjects}
          onProjectChange={this.handleChooseProjectChange}
        />
      </div>
    );
  }
}

export default ProjectList;
