import React, { Component } from 'react';

import { ProjectSchedule } from '../../models/Project';

interface IProjectTimeProps {
  schedule: ProjectSchedule;
}

class ProjectTime extends Component<IProjectTimeProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let schedule = this.props.schedule;

    if (schedule) {
      return (
        <div>
          <h5>Project Schedule</h5>
          {schedule ? <div> Schedule </div> : <div />}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ProjectTime;
