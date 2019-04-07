import React, { Component } from 'react';

import { ProjectSchedule, ProjectSprint } from '../../models/Project';
import EditType from '../../constant/editType';
import { addSprint, deleteSprint } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Timeline, Icon, Input, Button, DatePicker } from 'antd';

interface IProjectTimeProps {
  projectId: string;
  schedule: ProjectSchedule;
  addSprint: (projectId: string, editType: EditType, sprintDetail) => void;
  deleteSprint: (projectId: string, sprintId: string) => void;
}

interface IProjectTimeStates {
  isAddingSprint: boolean;
  newSprint: { name: string; detail: string; dueDate: string };
}

class ProjectTime extends Component<IProjectTimeProps, IProjectTimeStates> {
  constructor(props) {
    super(props);
    this.state = {
      isAddingSprint: false,
      newSprint: { name: '', detail: '', dueDate: '' }
    };
  }

  handleAddingSprint = () => {
    this.setState(state => ({ ...state, isAddingSprint: true }));
  };

  handleDeleteSprint = (sprintId: string) => {
    this.props.deleteSprint(this.props.projectId, sprintId);
  };

  handleInputChange = event => {
    const target = event.target;
    const type = target.name;

    let { name, detail, dueDate } = this.state.newSprint;

    switch (type) {
      case 'sprint_name':
        name = target.value;
        break;
      case 'sprint_detail':
        detail = target.value;
        break;
      case 'sprint_dueDate':
        dueDate = target.value;
        break;
    }

    this.setState(state => ({
      ...state,
      newSprint: {
        name,
        detail,
        dueDate
      }
    }));

    console.log(this.state.newSprint);
  };

  handleCreateSprint = () => {
    const { name, detail, dueDate } = this.state.newSprint;
    this.props.addSprint(this.props.projectId, EditType.TIMELINE, {
      name,
      detail,
      dueDate: new Date(dueDate)
    });

    this.setState(state => ({
      ...state,
      newSprint: { name: '', detail: '', dueDate: '' },
      isAddingSprint: false
    }));
  };

  onChangeDate = (date, dateString) => {
    this.setState(state => ({
      ...state,
      newSprint: { ...state.newSprint, dueDate: dateString }
    }));
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
                    <Timeline>
                      {schedule.sprints.map((sprint: ProjectSprint) => {
                        return (
                          <Timeline.Item>
                            <div key={sprint.dueDate.toString()}>
                              {sprint._id}
                              {sprint.name} {sprint.detail}{' '}
                              {sprint.dueDate.toString()}
                              <Icon
                                style={{ color: 'red' }}
                                type="close-circle"
                                onClick={() =>
                                  this.handleDeleteSprint(sprint._id)
                                }
                              />
                            </div>
                          </Timeline.Item>
                        );
                      })}
                    </Timeline>
                  </div>
                }
              </div>
              {this.state.isAddingSprint ? (
                <div>
                  <Input
                    placeholder="Sprint Name"
                    type="text"
                    name="sprint_name"
                    value={this.state.newSprint.name}
                    onChange={this.handleInputChange}
                  />
                  <Input
                    placeholder="Sprint Detail"
                    type="text"
                    name="sprint_detail"
                    value={this.state.newSprint.detail}
                    onChange={this.handleInputChange}
                  />
                  <DatePicker
                    name="sprint_dueDate"
                    onChange={this.onChangeDate}
                  />
                  <Button type="primary" onClick={this.handleCreateSprint}>
                    Create
                  </Button>
                </div>
              ) : (
                <div />
              )}
              <div>
                <button onClick={this.handleAddingSprint}> + Sprint </button>
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
