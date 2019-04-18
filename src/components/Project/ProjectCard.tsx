import React, { Component } from 'react';
import { Project } from '../../models';

import { Card, Icon } from 'antd';

const { Meta } = Card;

import projectAvatar from '../../images/projects/chat.svg';
import ProjectIcon from '../../images/project';

class ProjectCard extends Component<{ project?: Project }> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.project) {
      const { name, detail, img } = this.props.project;

      const projectIcon = img || ProjectIcon[0];

      return (
        <div>
          <Card
            hoverable
            bodyStyle={{ padding: '12px', margin: '5px' }}
            style={{ borderRadius: '10px', paddingTop: '10px' }}
            cover={<img height="50" alt="example Project" src={projectIcon} />}
          >
            <Meta
              style={{ textAlign: 'center' }}
              title={name}
              description={detail || 'project detail'}
            />
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Card
            hoverable
            bodyStyle={{ padding: '12px', margin: '5px' }}
            style={{ borderRadius: '10px', paddingTop: '10px' }}
            cover={<Icon style={{ fontSize: '50px' }} type="plus-circle" />}
          >
            <Meta
              style={{ textAlign: 'center' }}
              title="Add Project"
              description={'Adding new Project'}
            />
          </Card>
        </div>
      );
    }
  }
}

export default ProjectCard;
