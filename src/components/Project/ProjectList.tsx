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
          <div
            onClick={event => this.handleChangeProject(event, project)}
            key={project._id}
            className="col-md-6 col-lg-4 wow bounceInUp"
            data-wow-duration="1.4s"
            style={{ cursor: 'pointer' }}
          >
            <div className="box">
              <div className="icon" style={{ background: '#fceef3' }}>
                <i
                  className="ion-ios-paper-outline"
                  style={{ color: '#ff689b' }}
                />
              </div>
              <h4 className="title">
                <a href="">{project.name}</a>
              </h4>
              <p className="description">{project.detail}</p>
            </div>
          </div>
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
        <section id="projects" className="section-bg">
          <div className="container">
            <header className="section-header">
              <h4>Choose your project</h4>
              <br />
            </header>

            <div className="row">
              <ProjectCardList
                projects={projects}
                onProjectChange={this.handleChooseProjectChange}
              />
              <div
                onClick={this.showNewProjectInput}
                className="col-md-6 col-lg-4 wow bounceInUp"
                data-wow-duration="1.4s"
                style={{ cursor: 'pointer' }}
              >
                <div className="box">
                  <div className="icon" style={{ background: 'white' }}>
                    <i className="ion-ios-plus" style={{ color: '#ff689b' }} />
                  </div>
                  <h4 className="title">
                    <a href="">New Subject</a>
                  </h4>
                </div>
                {this.renderInputNewProject()}
              </div>
            </div>
            <h3>
              Your project is <strong> {this.props.chooseProject.name} </strong>
            </h3>
          </div>
        </section>
      </div>
    );
  }
}

export default ProjectList;
