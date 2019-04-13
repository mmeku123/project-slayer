import React, { Component } from 'react';
import Project from '../../models/Project';
import ProjectCard from './ProjectCard';
import { Row, Col, Button, Input } from 'antd';
import Title from 'antd/lib/typography/Title';

interface IProjectSectionProps {
  projects: Project[];
  isChooseProject: boolean;
  chooseProject: Project;
  onChangeProject: (project: Project) => void;
  onCreateProject: (projectName: string) => void;
}

interface IProjectSectionStates {
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
          <Col lg={8} md={10} sm={12} xs={24}>
            <div
              style={{ padding: '10px' }}
              onClick={() => this.handleChangeProject(project)}
            >
              <ProjectCard project={project} key={project._id} />
            </div>
          </Col>
        );
    });
  }
}

class ProjectSection extends Component<
  IProjectSectionProps,
  IProjectSectionStates
> {
  constructor(props: IProjectSectionProps) {
    super(props);
    this.state = { isAddNewProject: false, newProjectName: '' };
  }

  handleChooseProjectChange = (project: Project) => {
    this.props.onChangeProject(project);
  };

  showNewProjectInput = () => {
    console.log('click');
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
    console.log(this.state.isAddNewProject);
    return this.state.isAddNewProject ? (
      <Col lg={8} md={10} sm={12} xs={24}>
        <div>
          <Input placeholder="New Project" onChange={this.inputChange} />
          <Row type="flex" justify="end">
            <Col>
              <Button
                onClick={() => {
                  this.setState({ isAddNewProject: false });
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button onClick={this.createNewProject}>Add</Button>
            </Col>
          </Row>
        </div>
      </Col>
    ) : (
      <div />
    );
  };

  render() {
    let projects = this.props.projects;
    let project = this.props.chooseProject;

    return (
      <div>
        <Row style={{ minHeight: '300px' }} type="flex" align="middle">
          <Col md={12} xs={24}>
            <div style={{ textAlign: 'center' }}>
              Your Project is:
              <Title>{project ? project.name : 'Choose Project'}</Title>
            </div>
          </Col>

          <Col md={12} xs={24}>
            <Row type="flex" align="middle">
              <ProjectCardList
                projects={projects}
                onProjectChange={this.handleChooseProjectChange}
              />

              <Col lg={8} md={10} sm={12} xs={24}>
                <div
                  style={{ padding: '10px' }}
                  onClick={this.showNewProjectInput}
                >
                  <ProjectCard key="new_project" />
                </div>
              </Col>
              {this.renderInputNewProject()}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectSection;
