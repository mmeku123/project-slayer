import React, { Component } from 'react';
import { Subject } from '../../models';

import { Card, Icon } from 'antd';

const { Meta } = Card;

import subjectAvatar from '../../images/subjects/math.svg';

class SubjectCard extends Component<{ subject?: Subject }> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.subject) {
      const { id, name, detail } = this.props.subject;

      return (
        <div>
          <Card
            hoverable
            bodyStyle={{ padding: '12px', margin: '5px' }}
            style={{ borderRadius: '10px', paddingTop: '10px' }}
            cover={<img height="50" alt="exampleSubject" src={subjectAvatar} />}
          >
            <Meta
              style={{
                textAlign: 'center'
              }}
              title={name}
              description={
                <span>
                  <div>
                    <strong>ID: </strong>
                    {id || 'No id'}
                  </div>
                  <div>
                    <strong>Detail: </strong>
                    {detail || 'No detail'}
                  </div>
                </span>
              }
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
