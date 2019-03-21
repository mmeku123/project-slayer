import React, { Component } from 'react';
import Project from '../../models/Project';

import Task from '../../models/Task';
import { connect } from 'react-redux';
import { editProject } from '../../actions';
import { bindActionCreators } from 'redux';

interface IProjectTasksProps {
  tasks: Task[];
  focusProject: Project;
  editProject: (projectName: string, editType: string, detail) => void;
}

interface IProjectTasksStates {
  editDetail: Task;
  editTask: string;
  isEdit: boolean;
  isAddComment: boolean;
  newComment: string;
}

class ProjectTasks extends Component<IProjectTasksProps, IProjectTasksStates> {
  constructor(props) {
    super(props);
    this.state = {
      editDetail: null,
      editTask: '',
      isEdit: false,
      isAddComment: false,
      newComment: ''
    };
  }

  showEditDialog = (task: Task) => {
    this.setState(state => ({
      ...state,
      editDetail: task,
      editTask: task.name,
      isEdit: true
    }));
  };

  showNewCommentDialog = (task: Task) => {
    this.setState(state => ({
      ...state,
      editTask: task.name,
      isAddComment: true
    }));
  };

  handleTaskChange = event => {
    let { name, isDone, detail, priority } = this.state.editDetail;
    switch (event.target.name) {
      case 'name':
        name = event.target.value;
      case 'finish':
        isDone = event.target.value;
      case 'detail':
        detail = event.target.value;
      case 'priority':
        priority = event.target.value;
    }
    this.setState(state => {
      return {
        ...state,
        editDetail: { ...state.editDetail, name, isDone, detail, priority }
      };
    });
  };

  handleNewCommentChange = event => {
    let newComment = event.target.value;
    this.setState(state => ({ ...state, newComment }));
  };

  addNewComment = () => {
    let { editTask, newComment } = this.state;
    this.props.editProject(this.props.focusProject.name, 'task_comment', {
      taskName: editTask,
      newComment
    });
  };

  cancelEdit = () => {
    this.setState(state => ({ ...state, editDetail: null, isEdit: false }));
  };

  confirmEdit = () => {
    this.props.editProject(this.props.focusProject.name, 'task', {
      taskName: this.state.editTask,
      editDetail: this.state.editDetail
    });
    this.setState(state => ({ ...state, editDetail: null, isEdit: false }));
  };

  renderTaskEdit = (task: Task) => {
    let editDetail = this.state.editDetail;

    return (
      <div key={task._id}>
        task name:
        <input
          type="text"
          name="name"
          value={editDetail.name}
          onChange={this.handleTaskChange}
        />
        <div>{task.owners}</div>
        <div>
          finish :
          <input
            type="radio"
            name="finish"
            checked={editDetail.isDone}
            onChange={this.handleTaskChange}
          />
        </div>
        <div>
          detail :
          <textarea
            rows={4}
            cols={30}
            name="detail"
            onChange={this.handleTaskChange}
            value={editDetail.detail}
          />
        </div>
        <div>
          priority:
          <select name="priority" onChange={this.handleTaskChange}>
            <option value="1">High</option>
            <option value="2">Normal</option>
            <option value="3">Low</option>
          </select>
        </div>
        {task.startDate ? (
          <div>Start: {task.startDate.toISOString()}</div>
        ) : (
          <div />
        )}
        {task.dueDate ? <div>End: {task.dueDate.toISOString()}</div> : <div />}
        <ul>
          comment
          {task.comments.map(comment => {
            return (
              <li key={comment.detail + '$' + task._id}>
                {comment.detail} - {comment.ownerName} :
                {comment.time.toLocaleDateString()}
              </li>
            );
          })}
        </ul>
        <br />
        <button onClick={this.cancelEdit}>Cancel</button>
        <button onClick={this.confirmEdit}>Confirm</button>
      </div>
    );
  };

  renderTaskDetail = (task: Task) => {
    return (
      <div key={task._id}>
        <div>{task.name}</div>
        <div>{task.owners}</div>
        <div> status : {task.isDone ? 'finish' : 'not finish'} </div>
        <div> detail : {task.detail} </div>
        <div>priority: {task.priority}</div>
        {task.startDate ? (
          <div>Start: {task.startDate.toISOString()}</div>
        ) : (
          <div />
        )}
        {task.dueDate ? <div>End: {task.dueDate.toISOString()}</div> : <div />}
        <ul>
          comment
          {task.comments.map(comment => {
            return (
              <li key={comment.detail + '$' + task._id}>
                {comment.detail} - {comment.ownerName} :
                {comment.time.toLocaleDateString()}
              </li>
            );
          })}
          {this.state.isAddComment && task.name == this.state.editTask ? (
            <div>
              <input
                type="text"
                value={this.state.newComment}
                onChange={this.handleNewCommentChange}
              />
              <button onClick={this.addNewComment}>ADD</button>
            </div>
          ) : (
            <div />
          )}
          <button onClick={() => this.showNewCommentDialog(task)}>
            + Comment
          </button>
        </ul>
        <br />

        <button onClick={() => this.showEditDialog(task)}>Edit</button>
      </div>
    );
  };

  render() {
    let { tasks } = this.props.focusProject;

    console.log(this.props.focusProject);

    return (
      <div>
        <h5>Project Tasks </h5>

        {tasks.map(task => {
          if (task.name == this.state.editTask && this.state.isEdit == true) {
            return this.renderTaskEdit(task);
          } else {
            return this.renderTaskDetail(task);
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { focusProject: state.projects.focusProject };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editProject }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTasks);
