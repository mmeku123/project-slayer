import React, { Component } from 'react';

import { ProjectSchedule, ProjectSprint } from '../../models/Project';
import EditType from '../../constant/editType';
import { addSprint, deleteSprint } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Timeline,
  Icon,
  Input,
  Button,
  DatePicker,
  Card,
  Avatar,
  Progress
} from 'antd';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import Meta from 'antd/lib/card/Meta';
import Text from 'antd/lib/typography/Text';

const dateFormat = 'MM/DD/YYYY';
const nowMoment = () => moment().format(dateFormat);

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
      newSprint: { name: '', detail: '', dueDate: nowMoment() }
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
      dueDate
    });

    this.setState(state => ({
      ...state,
      newSprint: { name: '', detail: '', dueDate: nowMoment() },
      isAddingSprint: false
    }));
  };

  handleCancelCreateSprint = () => {
    this.setState(state => ({
      ...state,
      newSprint: { name: '', detail: '', dueDate: nowMoment() },
      isAddingSprint: false
    }));
  };

  handleOnDateChange = (date, dateString) => {
    this.setState(state => ({
      ...state,
      newSprint: { ...state.newSprint, dueDate: dateString }
    }));
  };

  render() {
    let schedule = this.props.schedule;
    console.log(schedule.sprints);
    return (
      <div style={{ textAlign: 'center' }}>
        <Title>Project Schedule</Title>
        {schedule ? (
          <div>
            <div>
              {
                <div>
                  <Title level={3} style={{ padding: '20px' }}>
                    {' '}
                    TIMELINE{' '}
                  </Title>
                  <Timeline mode="alternate">
                    <Timeline.Item>
                      <Card
                        style={{ borderRadius: '12px', textAlign: 'center' }}
                        hoverable
                        cover={
                          <Avatar
                            style={{ minHeight: '100px' }}
                            shape="square"
                            icon="user"
                          />
                        }
                      >
                        <div>
                          <Title level={4}>Create Project</Title>
                          <span>
                            <Text strong>Start : </Text>
                            <Text>
                              {moment(schedule.startDate).format('LL')}
                            </Text>
                          </span>
                        </div>
                      </Card>
                    </Timeline.Item>
                    {schedule.sprints.map((sprint: ProjectSprint) => {
                      const diffDay = moment(sprint.dueDate)
                        .startOf('day')
                        .fromNow();
                      console.log(diffDay);
                      return (
                        <Timeline.Item>
                          <div
                            key={sprint._id + '@' + sprint.dueDate}
                            style={{ margin: '12px' }}
                          >
                            <Card
                              style={{
                                borderRadius: '12px',
                                textAlign: 'center'
                              }}
                              hoverable
                              cover={
                                <Avatar
                                  style={{ minHeight: '100px' }}
                                  shape="square"
                                  icon="user"
                                />
                              }
                            >
                              <div>
                                <Title level={4}>
                                  {sprint.name || 'Noname sprint'}
                                </Title>
                                <div>
                                  <span>
                                    <Text strong>Detail : </Text>
                                    <Text>
                                      {sprint.detail || 'sprint detail'}
                                    </Text>
                                  </span>
                                </div>
                                <div>
                                  <span>
                                    <Text strong>Due Date : </Text>
                                    {moment(sprint.dueDate).format('LL')} (
                                    {diffDay})
                                  </span>
                                </div>
                                <Text />
                                <div style={{ textAlign: 'end' }}>
                                  <Icon
                                    style={{ color: 'red' }}
                                    type="close-circle"
                                    onClick={() =>
                                      this.handleDeleteSprint(sprint._id)
                                    }
                                  />
                                </div>
                              </div>
                            </Card>
                          </div>
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                </div>
              }
            </div>
            <div>Percent Complete</div>
            <div>
              <span>start</span>
              {/* FIXME */}
              <Progress percent={50} />
            </div>
          </div>
        ) : (
          <div />
        )}

        {this.state.isAddingSprint ? (
          <Card
            hoverable
            style={{ margin: '12px', lineHeight: '3.0em' }}
            title="New Sprint"
          >
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
                onChange={this.handleOnDateChange}
                defaultValue={moment(this.state.newSprint.dueDate, dateFormat)}
                format={dateFormat}
              />
              <Button onClick={this.handleCreateSprint}>Create</Button>

              <div>
                <Button onClick={this.handleCancelCreateSprint}>Cancel</Button>
                <Button type="primary" onClick={this.handleCreateSprint}>
                  Confirm
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div />
        )}
        <div style={{ height: '20px' }} />
        <Button onClick={this.handleAddingSprint} style={{ height: '45px' }}>
          <Icon style={{ fontSize: '24px' }} type="plus-circle" /> Sprint
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addSprint, deleteSprint }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectTime);
