import React, { Component } from 'react';
import { Comment } from '../../models/index';

interface IProejectCommentsProps {
  comments: Comment[];
}

class ProjectComments extends Component<IProejectCommentsProps> {
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
          return <div>{comment.detail}</div>;
        })}
      </div>
    );
  }
}

export default ProjectComments;
