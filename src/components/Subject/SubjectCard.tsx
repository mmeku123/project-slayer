import React, { Component } from 'react';
import { Subject } from '../../models';

import { Card, Icon } from 'antd';

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
            bodyStyle={{ padding: '12px', margin: '5px' }}
            style={{ borderRadius: '10px', paddingTop: '10px' }}
            cover={<img height="70" alt="exampleSubject" src={projectAvatar} />}
          >
            <Meta
              style={{
                textAlign: 'center'
              }}
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
            bodyStyle={{ padding: '12px', margin: '5px' }}
            style={{ borderRadius: '10px', paddingTop: '10px' }}
            cover={<Icon style={{ fontSize: '50px' }} type="plus-circle" />}
          >
            <Meta
              style={{
                textAlign: 'center'
              }}
              title="New"
              description={'New Subject'}
            />
          </Card>
        </div>
      );
    }
  }
}

export default SubjectCard;
