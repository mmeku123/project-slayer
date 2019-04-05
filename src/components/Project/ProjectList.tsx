import React, { Component } from 'react';
import Project from '../../models/Project';
import ProjectCard from './ProjectCard';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';

interface IProjectListProps {
  projects: Project[];
  isChooseProject: boolean;
  chooseProject: Project;
  onChangeProject: (project: Project) => void;
  onCreateProject: (projectName: string) => void;
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

  handleChangeProject = (project: Project) => {
    this.props.onProjectChange(project);
  };

  render() {
    return this.props.projects.map(project => {
      if (project)
        return (
          <Col span={6}>
            <div onClick={() => this.handleChangeProject(project)}>
              <ProjectCard project={project} key={project._id} />
            </div>
          </Col>
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
        <div>
          <div style={{ textAlign: 'center' }}>
            Your Project is:{' '}
            <Title>{project ? project.name : 'Choose Project'}</Title>
          </div>
          {project ? (
            <div>
              <Title level={3}>Detail: {project.detail}</Title>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div>
          <Row>
            <ProjectCardList
              projects={projects}
              onProjectChange={this.handleChooseProjectChange}
            />

            <Col span={6}>
              <div onClick={() => this.showNewProjectInput}>
                <ProjectCard key="new_project" />
              </div>
            </Col>
          </Row>
          {this.renderInputNewProject()}
        </div>
      </div>
    );
  }
}

export default ProjectList;
