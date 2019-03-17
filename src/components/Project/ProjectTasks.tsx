import React, { Component } from 'react';

import Task from '../../models/Task';

interface IProjectTasksProps {
  tasks: Task[];
}

class ProjectTasks extends Component<IProjectTasksProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let tasks = this.props.tasks;

    return (
      <div>
        <h5>Project Tasks </h5>

        {tasks.map(task => {
          return (
            <div key={task.name}>
              <div>{task.name}</div>
              <div> status : {task.isDone ? 'finish' : 'not finish'} </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProjectTasks;
