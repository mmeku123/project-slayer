import React, { Component } from 'react';
import { Project } from '../../models';

import { Typography } from 'antd';

const { Title } = Typography;

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
      <div style={{ textAlign: 'center' }}>
        <Title>{project.name}</Title>
      </div>
    );
  }
}

export default ProjectHeader;
