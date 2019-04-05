import React, { Component } from 'react';
import { Subject } from '../../models';

import { Card } from 'antd';

const { Meta } = Card;

import projectAvatar from '../../images/projects/432386.svg';

class SubjectCard extends Component<{ subject?: Subject }> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.subject) {
      const { name, owner } = this.props.subject;

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
              description={owner || 'subject detail'}
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
                alt="newSubject"
                src={projectAvatar}
              />
            }
          >
            <Meta
              style={{ textAlign: 'center' }}
              title="Add Subject"
              description={'Adding new Subject'}
            />
          </Card>
        </div>
      );
    }
  }
}

export default SubjectCard;
