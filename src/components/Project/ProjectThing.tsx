import React, { Component } from 'react';
import { Comment, Project } from '../../models';

interface IProjectThingProps {
  project: Project;
}

class ProjectThing extends Component<IProjectThingProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let project: Project = this.props.project;
    let {
      name,
      detail,
      tasks,
      members,
      comments,
      progress,
      schedule
    } = project;

    return (
      <div>
        <div>Project Name {name}</div>
        <div>Project Detail {detail}</div>
        <div>Project Tasks </div>
        {tasks.map(task => {
          return <div>{task.detail}</div>;
        })}
        <div>Project Comments</div>
        {comments.map(comment => {
          return <div>{comment.detail}</div>;
        })}
        <div>Project Members</div>
        {members.map(member => {
          return <div>{member.name}</div>;
        })}
        <div>Project Progress</div>
        {progress ? <div> Progress </div> : <div />}
        <div>Project Schedule</div>
        {schedule ? <div> Schedule </div> : <div />}
      </div>
    );
  }
}

export default ProjectThing;
