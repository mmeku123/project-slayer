import React, { Component } from 'react';
import Project from '../../models/Project';
import { Comment } from '../../models';
import Task from '../../models/Task';
import { connect } from 'react-redux';
import { editTask, addTask } from '../../actions';
import { bindActionCreators } from 'redux';
import EditType from '../../constant/editType';
import {
  Input,
  Radio,
  Select,
  Switch,
  Button,
  Card,
  Icon,
  DatePicker,
  Row,
  Col
} from 'antd';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import Text from 'antd/lib/typography/Text';

const Option = Select.Option;
const dateFormat = 'MM/DD/YYYY';
interface IProjectTasksProps {
  tasks: Task[];
  focusProject: Project;
  addTask: (projectId: string, taskDetail) => void;
  editTask: (projectId: string, taskId: string, editData) => void;
}

interface IProjectTasksStates {
  newTask: Task;
  editDetail: Task;
  editTaskId: string;
  isAddingTask: boolean;
  isEdit: boolean;
  isAddComment: boolean;
  newComment: string;
}

class ProjectTasks extends Component<IProjectTasksProps, IProjectTasksStates> {
  constructor(props) {
    super(props);
    this.state = {
      newTask: new Task('', '', this.props.focusProject._id),
      isAddingTask: false,
      editDetail: null,
      editTaskId: '',
      isEdit: false,
      isAddComment: false,
      newComment: ''
    };
  }

  showEditDialog = (task: Task) => {
    if (this.state.isEdit) {
      this.setState(state => ({
        ...state,
        isEdit: false
      }));
    } else {
      this.setState(state => ({
        ...state,
        editDetail: task,
        editTaskId: task._id,
        isEdit: true
      }));
    }
  };

  showNewCommentDialog = (task: Task) => {
    this.setState(state => ({
      ...state,
      editTaskId: task._id,
      isAddComment: true
    }));
  };

  handleTaskChange = event => {
    let { name, isDone, detail, priority } = this.state.editDetail;
    switch (event.target.name) {
      case 'name':
        name = event.target.value;
        break;
      case 'finish':
        isDone = event.target.value;
        break;
      case 'detail':
        detail = event.target.value;
        break;
      case 'priority':
        priority = event.target.value;
        break;
    }
    this.setState(state => {
      return {
        ...state,
        editDetail: { ...state.editDetail, name, isDone, detail, priority }
      };
    });
  };

  handleNewTaskChange = event => {
    let { name, isDone, detail, priority } = this.state.newTask;
    switch (event.target.name) {
      case 'name':
        name = event.target.value;
        break;
      case 'finish':
        isDone = event.target.value;
        break;
      case 'detail':
        detail = event.target.value;
        break;
      case 'priority':
        priority = event.target.value;
        break;
    }
    this.setState(state => {
      return {
        ...state,
        newTask: { ...state.editDetail, name, isDone, detail, priority }
      };
    });
    console.log(this.state.newTask);
  };

  handleCreatingTask = () => {
    this.setState(state => ({ ...state, isAddingTask: true }));
  };

  handleCancelCreate = () => {
    this.setState(state => ({ ...state, isAddingTask: false }));
  };

  handleCreateTask = () => {
    const {
      name,
      isDone,
      detail,
      priority,
      startDate,
      dueDate
    } = this.state.newTask;
    this.props.addTask(this.props.focusProject._id, this.state.newTask);

    this.setState(state => ({ ...state, isAddingTask: false }));
  };

  handleNewCommentChange = event => {
    let newComment = event.target.value;
    this.setState(state => ({ ...state, newComment }));
  };

  handleDeleteComment = (taskId: string, commentId: string) => {
    this.props.editTask(this.props.focusProject._id, taskId, {
      type: 'delete_comment',
      commentId
    });
  };

  cancelNewComment = () => {
    this.setState(state => ({
      ...state,
      isAddComment: false
    }));
  };
  addNewComment = (task: Task) => {
    let { newComment } = this.state;
    this.props.editTask(this.props.focusProject._id, task._id, {
      type: 'add_comment',
      newComment
    });
    this.setState(state => ({
      ...state,
      editTaskId: task._id,
      isAddComment: false
    }));
  };

  cancelEdit = () => {
    this.setState(state => ({ ...state, editDetail: null, isEdit: false }));
  };

  confirmEdit = (task: Task) => {
    this.props.editTask(this.props.focusProject._id, task._id, {
      type: 'detail',
      editDetail: this.state.editDetail
    });
    this.setState(state => ({ ...state, editDetail: null, isEdit: false }));
  };

  handleOnCreateStartDateChange = (date, dateString) => {
    this.setState(state => ({
      ...state,
      newTask: { ...state.newTask, startDate: dateString }
    }));
  };

  handleOnCreateDueDateChange = (date, dateString) => {
    this.setState(state => ({
      ...state,
      newTask: { ...state.newTask, dueDate: dateString }
    }));
  };

  renderTaskCreate = () => {
    const { newTask } = this.state;

    return this.state.isAddingTask ? (
      <div style={{ margin: '12px' }}>
        <Card hoverable title="New Task">
          <div style={{ lineHeight: '3.0em' }}>
            <Input
              type="text"
              name="name"
              value={newTask.name}
              onChange={this.handleNewTaskChange}
              placeholder="Task Name"
            />
            <div>
              detail :{' '}
              <Input
                name="detail"
                value={newTask.detail}
                onChange={this.handleNewTaskChange}
                placeholder="Task Detail"
              />
            </div>
            <div>
              finish :{' '}
              <Switch
                defaultChecked={newTask.isDone}
                onChange={checked => {
                  this.setState(state => ({
                    ...state,
                    newTask: { ...state.newTask, isDone: checked }
                  }));
                }}
              />
            </div>

            <div>
              priority:{' '}
              <Select
                defaultValue="Normal"
                onChange={value => {
                  this.setState(state => ({
                    ...state,
                    newTask: { ...state.newTask, priority: value.toString() }
                  }));
                }}
              >
                <Option value="High">High</Option>
                <Option value="Normal">Normal</Option>
                <Option value="Low">Low</Option>
              </Select>
            </div>
            <div>
              Start Date :{' '}
              <DatePicker
                onChange={this.handleOnCreateStartDateChange}
                defaultValue={moment(this.state.newTask.startDate, dateFormat)}
                format={dateFormat}
              />
            </div>
            <div>
              Due Date :{' '}
              <DatePicker
                onChange={this.handleOnCreateDueDateChange}
                defaultValue={moment(this.state.newTask.dueDate, dateFormat)}
                format={dateFormat}
              />
            </div>
            <Button onClick={this.handleCancelCreate}>Cancel</Button>
            <Button type="primary" onClick={this.handleCreateTask}>
              Create
            </Button>
          </div>
        </Card>
      </div>
    ) : (
      <div />
    );
  };

  handleOnStartDateChange = (date, dateString) => {
    this.setState(state => ({
      ...state,
      editDetail: { ...state.editDetail, startDate: dateString }
    }));
  };

  handleOnDueDateChange = (date, dateString) => {
    this.setState(state => ({
      ...state,
      editDetail: { ...state.editDetail, dueDate: dateString }
    }));
  };

  renderTaskEdit = (task: Task) => {
    let editDetail = this.state.editDetail;

    return (
      <Col key={task._id} style={{ margin: '12px' }} md={11}>
        <Card
          hoverable
          title={
            <span>
              <span style={{ fontWeight: 100 }}>Task</span>
              <span style={{ fontSize: '24px' }}> {task.name}</span>
            </span>
          }
          extra={
            <span>
              <span style={{ fontWeight: 100 }}> id </span>
              {task._id}
            </span>
          }
        >
          <div style={{ lineHeight: '2.0em' }}>
            Task name :
            <Input
              type="text"
              name="name"
              value={editDetail.name}
              onChange={this.handleTaskChange}
              placeholder="Task Name"
            />
            <div>
              detail :{' '}
              <Input
                name="detail"
                value={editDetail.detail}
                onChange={this.handleTaskChange}
                placeholder="Task Detail"
              />
            </div>
            <div>
              finish :{' '}
              <Switch
                checked={editDetail.isDone}
                onChange={checked => {
                  this.setState(state => ({
                    ...state,
                    editDetail: { ...state.editDetail, isDone: checked }
                  }));
                }}
              />
            </div>
            <div>
              priority :{' '}
              <Select
                defaultValue={this.state.editDetail.priority}
                onChange={value => {
                  this.setState(state => ({
                    ...state,
                    editDetail: {
                      ...state.editDetail,
                      priority: value.toString()
                    }
                  }));
                }}
              >
                <Option value="High">High</Option>
                <Option value="Normal">Normal</Option>
                <Option value="Low">Low</Option>
              </Select>
            </div>
            {task.startDate ? (
              <div>
                Start Date :{' '}
                <DatePicker
                  onChange={this.handleOnStartDateChange}
                  defaultValue={moment(
                    this.state.editDetail.startDate,
                    dateFormat
                  )}
                  format={dateFormat}
                />
              </div>
            ) : (
              <div />
            )}
            {task.dueDate ? (
              <div>
                Due Date :{' '}
                <DatePicker
                  onChange={this.handleOnDueDateChange}
                  defaultValue={moment(
                    this.state.editDetail.dueDate,
                    dateFormat
                  )}
                  format={dateFormat}
                />
              </div>
            ) : (
              <div />
            )}
            <ul>
              comment
              {task.comments.map((comment: Comment) => {
                return (
                  <li key={comment._id + '$' + task._id}>
                    {comment.detail} - {comment.ownerEmail}
                    <i> {moment(comment.time).format('LL')}</i>
                    <Button
                      shape="circle"
                      type="danger"
                      onClick={() =>
                        this.handleDeleteComment(task._id, comment._id)
                      }
                      style={{ margin: '8px', lineHeight: '0em' }}
                    >
                      <Icon type="delete" />
                    </Button>
                  </li>
                );
              })}
            </ul>
            <br />
            <Button onClick={this.cancelEdit}>Cancel</Button>
            <Button onClick={() => this.confirmEdit(task)}>Confirm</Button>
          </div>
        </Card>
      </Col>
    );
  };

  renderTaskDetail = (task: Task) => {
    return (
      <Col key={task._id} style={{ margin: '12px' }} md={11}>
        <Card
          hoverable
          style={{
            borderRadius: '12px'
          }}
          title={
            <span>
              <span style={{ fontWeight: 100 }}>Task</span>
              <span style={{ fontSize: '24px' }}> {task.name}</span>
            </span>
          }
          extra={
            <span>
              <span style={{ fontWeight: 100 }}> id </span>
              {task._id}
            </span>
          }
        >
          <div style={{ lineHeight: '2.0em' }}>
            <div>
              <Title level={3}>{task.name}</Title>
            </div>
            <div>
              {' '}
              <Text strong>detail :</Text> {task.detail}{' '}
            </div>
            <div>
              {' '}
              <Text strong>status :</Text>{' '}
              {task.isDone ? 'finish' : 'not finish'}{' '}
            </div>

            <div>
              <Text strong>priority :</Text> {task.priority}
            </div>
            {task.startDate ? (
              <div>
                <Text strong>Start Date :</Text>{' '}
                {moment(task.startDate).format('LL')}
              </div>
            ) : (
              <div />
            )}
            {task.dueDate ? (
              <div>
                <Text strong>Due Date :</Text>{' '}
                {moment(task.dueDate).format('LL')} (
                {moment(task.dueDate)
                  .startOf('day')
                  .fromNow()}
                )
              </div>
            ) : (
              <div />
            )}
            <ul>
              Comment
              {task.comments.map((comment: Comment) => {
                return (
                  <li key={comment.time + '@' + task._id + '$'}>
                    <div>
                      {comment.detail} - {comment.ownerEmail}{' '}
                      <i> {moment(comment.time).format('LL')}</i>
                    </div>
                  </li>
                );
              })}
              {this.state.isAddComment && task._id == this.state.editTaskId ? (
                <div>
                  <Input
                    style={{ width: '50%', margin: '12px' }}
                    type="text"
                    value={this.state.newComment}
                    onChange={this.handleNewCommentChange}
                    placeholder="Write a reply..."
                  />
                  <Button onClick={() => this.cancelNewComment()}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => this.addNewComment(task)}
                  >
                    Enter
                  </Button>
                </div>
              ) : (
                <div />
              )}
              <Button onClick={() => this.showNewCommentDialog(task)}>
                {this.state.isEdit ? <span>Cancel</span> : <span>Reply</span>}
              </Button>
            </ul>
            <br />

            <div style={{ textAlign: 'end' }}>
              <Button
                shape="circle"
                style={{ lineHeight: '0em' }}
                onClick={() => this.showEditDialog(task)}
              >
                <Icon type="setting" />
              </Button>
            </div>
          </div>
        </Card>
      </Col>
    );
  };

  render() {
    let tasksByTime = this.props.tasks['byTime'];

    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Title>Project Tasks </Title>
          <Button onClick={this.handleCreatingTask} style={{ height: '45px' }}>
            <Icon style={{ fontSize: '24px' }} type="file-add" /> Add Task
          </Button>
        </div>
        {this.renderTaskCreate()}
        <Row type="flex" justify="space-around">
          {tasksByTime != [] ? (
            tasksByTime.map((task: Task) => {
              if (
                task._id == this.state.editTaskId &&
                this.state.isEdit == true
              ) {
                return this.renderTaskEdit(task);
              } else {
                return this.renderTaskDetail(task);
              }
            })
          ) : (
            <div />
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { focusProject: state.projects.focusProject };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editTask, addTask }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTasks);
