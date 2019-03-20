import React, { Component } from 'react';
import { Comment } from '../../models/index';

interface IProjectChatProps {
  comments: Comment[];
}

class ProjectChat extends Component<IProjectChatProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let comments = this.props.comments;

    return (
      <div>
        <h5>Project Comments</h5>
        {comments.map(comment => {
          return (
            <div key={comment.detail}>
              <div>{comment.detail}</div>
              <ul>
                <li>{comment.ownerName}</li>
                <li>{comment.time.toUTCString()}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProjectChat;
