import React, { Component } from 'react';
import { Project } from '../../models';

import { Typography, Divider, Row, Col } from 'antd';

const { Title, Text } = Typography;

interface IProjectHeaderProps {
  project: Project;
}

class ProjectTitle extends Component<IProjectHeaderProps> {
  constructor(props) {
    super(props);
  }
  render() {
    let project = this.props.project;

    return (
      <div style={{ textAlign: 'center' }}>
        <Title>{project.name}</Title>
        <Text>{project.detail}</Text>
        <div style={{ height: '20px' }} />
        <div style={{ margin: '0 10vw 0 10vw' }}>
          <Divider />
        </div>
        <div style={{ height: '20px' }} />
      </div>
    );
  }
}

export default ProjectTitle;
