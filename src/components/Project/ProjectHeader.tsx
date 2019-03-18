import React, { Component } from 'react';
import { Project } from '../../models';

interface IProjectHeaderProps {
  project: Project;
}

class ProjectHeader extends Component<IProjectHeaderProps> {
  constructor(props) {
    super(props);
  }
  render() {
    let project = this.props.project;

    return (
      <div>
        <h3>{project.name}</h3>
      </div>
    );
  }
}

export default ProjectHeader;
