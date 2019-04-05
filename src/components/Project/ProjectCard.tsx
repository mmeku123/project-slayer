import React, { Component } from 'react';
import { Project } from '../../models';

import { Card } from 'antd';

const { Meta } = Card;

import projectAvatar from '../../images/projects/432386.svg';

class ProjectCard extends Component<{ project?: Project }> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.project) {
      const { name, detail } = this.props.project;

      return (
        <div>
          <Card
            hoverable
            style={{ width: 240, borderRadius: '10px' }}
            cover={
              <img
                style={{ margin: '10px' }}
                height="70"
                alt="exampleSubject"
                src={projectAvatar}
              />
            }
          >
            <Meta
              style={{ textAlign: 'center' }}
              title={name}
              description={detail || 'subject detail'}
            />
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Card
            hoverable
            style={{ width: 240, borderRadius: '10px' }}
            cover={
              <img
                style={{ margin: '10px' }}
                height="70"
                alt="newProject"
                src={projectAvatar}
              />
            }
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