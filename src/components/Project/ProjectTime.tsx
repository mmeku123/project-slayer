import React, { Component } from 'react';

import { ProjectSchedule, ProjectSprint } from '../../models/Project';
import { EditType } from '../../constant/editType';
import { addSprint, deleteSprint } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProjectTimeProps {
  projectId: string;
  schedule: ProjectSchedule;
  addSprint: (projectId: string, editType: EditType, sprintDetail) => void;
  deleteSprint: (projectId: string, sprintId: string) => void;
}

class ProjectTime extends Component<IProjectTimeProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddSprint = () => {
    this.props.addSprint(this.props.projectId, EditType.TIMELINE, {
      name: 'simple sprint',
      detail: 'clear all the work',
      dueDate: new Date()
    });
  };

  handleDeleteSprint = (sprintId: string) => {
    this.props.deleteSprint(this.props.projectId, sprintId);
  };

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
                start: {schedule.startDate.toString()}
                {
                  <div>
                    Timeline :
                    {schedule.sprints.map((sprint: ProjectSprint) => {
                      return (
                        <div key={sprint.dueDate.toString()}>
                          {sprint._id}
                          {sprint.detail} {sprint.detail}{' '}
                          {sprint.dueDate.toString()}
                          <button
                            onClick={() => this.handleDeleteSprint(sprint._id)}
                          >
                            DELETE
                          </button>
                        </div>
                      );
                    })}
                  </div>
                }
              </div>
              <div>
                <button onClick={this.handleAddSprint}> + Sprint </button>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addSprint, deleteSprint }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectTime);
