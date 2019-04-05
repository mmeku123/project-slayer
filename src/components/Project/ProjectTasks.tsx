import React, { Component } from 'react';
import Project from '../../models/Project';
import { Comment } from '../../models';
import Task from '../../models/Task';
import { connect } from 'react-redux';
import { editTask, addTask } from '../../actions';
import { bindActionCreators } from 'redux';
import EditType from '../../constant/editType';

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
    this.setState(state => ({
      ...state,
      editDetail: task,
      editTaskId: task._id,
      isEdit: true
    }));
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
      <div>
        <input
          type="text"
          name="name"
          value={newTask.name}
          onChange={this.handleNewTaskChange}
        />
        <div>
          finish :
          <input
            type="radio"
            name="finish"
            checked={newTask.isDone}
            onChange={this.handleNewTaskChange}
          />
        </div>
        <div>
          detail :
          <textarea
            rows={4}
            cols={30}
            name="detail"
            value={newTask.detail}
            onChange={this.handleNewTaskChange}
          />
        </div>
        <div>
          priority:
          <select
            name="priority"
            onChange={this.handleNewTaskChange}
            value={newTask.priority}
          >
            <option value="1">High</option>
            <option value="2">Normal</option>
            <option value="3">Low</option>
          </select>
        </div>
        <button onClick={this.handleCreateTask}>Create Task</button>
      </div>
    ) : (
      <div />
    );
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
        <div>{task.owner}</div>
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
            value={editDetail.detail}
            onChange={this.handleTaskChange}
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
          <div>Start: {task.startDate.toString()}</div>
        ) : (
          <div />
        )}
        {task.dueDate ? <div>End: {task.dueDate.toString()}</div> : <div />}
        <ul>
          comment
          {task.comments.map((comment: Comment) => {
            return (
              <li key={comment._id + '$' + task._id}>
                {comment.detail} - {comment.ownerId} :{comment.time.toString()}
                <button
                  onClick={() =>
                    this.handleDeleteComment(task._id, comment._id)
                  }
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        <br />
        <button onClick={this.cancelEdit}>Cancel</button>
        <button onClick={() => this.confirmEdit(task)}>Confirm</button>
      </div>
    );
  };

  renderTaskDetail = (task: Task) => {
    return (
      <div key={task._id}>
        <div>{task.name}</div>
        <div>{task.owner}</div>
        <div> status : {task.isDone ? 'finish' : 'not finish'} </div>
        <div> detail : {task.detail} </div>
        <div>priority: {task.priority}</div>
        {task.startDate ? (
          <div>Start: {task.startDate.toString()}</div>
        ) : (
          <div />
        )}
        {task.dueDate ? <div>End: {task.dueDate.toString()}</div> : <div />}
        <ul>
          comment
          {task.comments.map((comment: Comment) => {
            return (
              <li key={comment.time.toString() + '@' + task._id + '$'}>
                {comment.detail} - {comment.ownerId} :{comment.time.toString()}
                <button
                  onClick={() =>
                    this.handleDeleteComment(task._id, comment._id)
                  }
                >
                  Delete
                </button>
              </li>
            );
          })}
          {this.state.isAddComment && task._id == this.state.editTaskId ? (
            <div>
              <input
                type="text"
                value={this.state.newComment}
                onChange={this.handleNewCommentChange}
              />
              <button onClick={() => this.addNewComment(task)}>ADD</button>
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
    let tasksByTime = this.props.tasks['byTime'];

    return (
      <div>
        <h5>Project Tasks </h5>
        <button onClick={this.handleCreatingTask}>+ Task</button>
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
