import { Project } from './Project';
import Comment from './Comment';
import moment from 'moment';

class Task {
  _id: string;
  priority: string;
  name: string;
  detail: string;

  projectId: string;

  owner: string;

  isDone: boolean;
  comments: Comment[] = [];

  startDate: string;
  dueDate: string;

  constructor(name: string, detail: string, projectId: string) {
    this.projectId = projectId;
    this.name = name;
    this.detail = detail;
    this.isDone = false;
    this.priority = 'NORMAL';
    this.owner = localStorage.getItem('auth_id');
    // ! FIXME !!!!
    this.startDate = moment().format('L');
    this.dueDate = moment().format('L');
  }

  static toJson(projectId, task) {
    return {
      priority: task.priority,
      name: task.name,
      projectId,
      detail: task.detail,
      owner: localStorage.getItem('auth_id'),
      isDone: task.isDone,
      comments: task.comments,
      startDate: task.startDate || moment().format('MM/DD/YYYY'),
      dueDate: task.dueDate || moment().format('MM/DD/YYYY')
    };
  }

  static fromMap(id, data) {
    const newTask = new Task(data.name, data.detail, data.projectId);
    newTask._id = id;
    newTask.priority = data.priority;
    newTask.projectId = data.projectId;
    newTask.owner = data.owner;
    newTask.isDone = data.isDone;
    newTask.comments = data.comments;
    newTask.startDate = data.startDate;
    newTask.dueDate = data.dueDate;
    return newTask;
  }
}

export default Task;
