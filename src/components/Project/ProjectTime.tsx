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
          {schedule ? (
            <div>
              Schedule
              <div>
                start: {schedule.startDate.toISOString()}
                {
                  <div>
                    Timeline :
                    {schedule.sprints.map(sprint => {
                      return (
                        <div key={sprint._id}>
                          {sprint.detail} {sprint.detail}{' '}
                          {sprint.dueDate.toISOString()}
                        </div>
                      );
                    })}
                  </div>
                }
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ProjectTime;
