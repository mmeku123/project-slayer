import { Project } from './Project';
import Comment from './Comment';

class Task {
  _id: string;
  priority: string;
  name: string;
  detail: string;

  projectId: string;

  owner: string;

  isDone: boolean;
  comments: Comment[] = [];

  startDate?: Date;
  dueDate?: Date;

  constructor(name: string, detail: string, projectId: string) {
    this.projectId = projectId;
    this.name = name;
    this.detail = detail;
    this.isDone = false;
    this.priority = 'NORMAL';
    this.owner = localStorage.getItem('auth_id');
    this.startDate = new Date();
    this.dueDate = new Date();
  }

  static toJson(projectId, task) {
    return {
      priority: task.priority,
      name: task.name,
      projectId,
      detail: task.detail,
      owner: localStorage.getItem('auth_id'),
      isDone: task.isDone,
      comments: [],
      startDate: new Date(task.startDate),
      dueDate: new Date(task.dueDate)
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
