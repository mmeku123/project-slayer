import React, { Component } from 'react';
import Project from '../../models/Project';
import { Comment } from '../../models';
import Task from '../../models/Task';
import { connect } from 'react-redux';
import { editTask, addTask } from '../../actions';
import { bindActionCreators } from 'redux';
import EditType from '../../constant/editType';
import { Input, Radio, Select, Switch, Button, Card } from 'antd';
import Title from 'antd/lib/typography/Title';

const Option = Select.Option;

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
              detail :
              <Input
                name="detail"
                value={newTask.detail}
                onChange={this.handleNewTaskChange}
                placeholder="Task Detail"
              />
            </div>
            <div>
              finish :
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
              priority:
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
            <Button onClick={this.handleCancelCreate}>Cancel</Button>
            <Button onClick={this.handleCreateTask}>Create</Button>
          </div>
        </Card>
      </div>
    ) : (
      <div />
    );
  };

  renderTaskEdit = (task: Task) => {
    let editDetail = this.state.editDetail;

    return (
      <div key={task._id} style={{ margin: '12px' }}>
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
            task name:
            <Input
              type="text"
              name="name"
              value={editDetail.name}
              onChange={this.handleTaskChange}
              placeholder="Task Name"
            />
            <div>Assign to: {task.owner}</div>
            <div>
              detail :
              <Input
                name="detail"
                value={editDetail.detail}
                onChange={this.handleTaskChange}
                placeholder="Task Detail"
              />
            </div>
            <div>
              finish :
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
              priority:
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
            {task.startDate ? <div>Start: {task.startDate}</div> : <div />}
            {task.dueDate ? <div>End: {task.dueDate}</div> : <div />}
            <ul>
              comment
              {task.comments.map((comment: Comment) => {
                return (
                  <li key={comment._id + '$' + task._id}>
                    {comment.detail} - {comment.ownerId} :{comment.time}
                    <Button
                      onClick={() =>
                        this.handleDeleteComment(task._id, comment._id)
                      }
                    >
                      Delete
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
      </div>
    );
  };

  renderTaskDetail = (task: Task) => {
    return (
      <div key={task._id} style={{ margin: '12px' }}>
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
            <div>{task.name}</div>
            <div>{task.owner}</div>
            <div> detail : {task.detail} </div>
            <div> status : {task.isDone ? 'finish' : 'not finish'} </div>

            <div>priority: {task.priority}</div>
            {task.startDate ? <div>Start: {task.startDate}</div> : <div />}
            {task.dueDate ? <div>End: {task.dueDate}</div> : <div />}
            <ul>
              comment
              {task.comments.map((comment: Comment) => {
                return (
                  <li key={comment.time + '@' + task._id + '$'}>
                    {comment.detail} - {comment.ownerId} :{comment.time}
                    <Button
                      onClick={() =>
                        this.handleDeleteComment(task._id, comment._id)
                      }
                    >
                      Delete
                    </Button>
                  </li>
                );
              })}
              {this.state.isAddComment && task._id == this.state.editTaskId ? (
                <div>
                  <Input
                    type="text"
                    value={this.state.newComment}
                    onChange={this.handleNewCommentChange}
                    placeholder="Write a reply..."
                  />
                  <Button onClick={() => this.addNewComment(task)}>
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

            <Button onClick={() => this.showEditDialog(task)}>Edit</Button>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    let tasksByTime = this.props.tasks['byTime'];

    return (
      <div>
        <Title>Project Tasks </Title>
        <Button onClick={this.handleCreatingTask}>+ Task</Button>
        {this.renderTaskCreate()}
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
