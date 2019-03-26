import React, { Component } from 'react';
import Project from '../../models/Project';

interface IProjectListProps {
  projects: Project[];
  isChooseProject: boolean;
  chooseProject: Project;
  onChangeProject: (project: Project) => void;
  onCreateProject: (projectName: string) => void;
  onEditProject: (project: Project) => void;
}

interface IProjectListState {
  isAddNewProject: boolean;
  newProjectName: string;
}

class ProjectCardList extends Component<{
  projects: Project[];
  onProjectChange: (project: Project) => void;
}> {
  constructor(props) {
    super(props);
  }

  handleChangeProject = (event, project: Project) => {
    this.props.onProjectChange(project);
  };

  render() {
    return this.props.projects.map(project => {
      if (project)
        return (
          <button
            onClick={event => this.handleChangeProject(event, project)}
            key={project._id}
          >
            {project.name}
          </button>
        );
    });
  }
}

class ProjectList extends Component<IProjectListProps, IProjectListState> {
  constructor(props: IProjectListProps) {
    super(props);
    this.state = { isAddNewProject: false, newProjectName: '' };
  }

  handleChooseProjectChange = (project: Project) => {
    this.props.onChangeProject(project);
  };

  showNewProjectInput = () => {
    this.setState({ isAddNewProject: true });
  };

  createNewProject = () => {
    this.props.onCreateProject(this.state.newProjectName);
    this.setState({ isAddNewProject: false });
  };

  inputChange = event => {
    this.setState({ newProjectName: event.target.value });
  };

  renderInputNewProject = () => {
    return this.state.isAddNewProject ? (
      <div>
        <input placeholder="New Project" onChange={this.inputChange} />
        <button onClick={this.createNewProject}>+</button>
      </div>
    ) : (
      <div />
    );
  };

  render() {
    let projects = this.props.projects;
    let project = this.props.chooseProject;

    return (
      <div>
        {project ? (
          <div>
            <div>Your Project is: {project.name}</div>
            <div>Detail: {project.detail}</div>

            <ProjectCardList
              projects={projects}
              onProjectChange={this.handleChooseProjectChange}
            />
          </div>
        ) : (
          <div />
        )}
        <div>
          <button onClick={this.showNewProjectInput}>New Project</button>
          {this.renderInputNewProject()}
        </div>
      </div>
    );
  }
}

export default ProjectList;
