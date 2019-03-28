import { Project } from './Project';
import Comment from './Comment';

class Task {
  _id: string;
  priority: number;
  name: string;
  detail: string;

  projectId: string;

  owner: string;

  isDone: boolean;
  comments: Comment[] = [];

  startDate?: Date;
  dueDate?: Date;

  constructor(name: string, detail: string) {
    this.name = name;
    this.detail = detail;
  }

  static toJson(projectId) {
    return {
      priority: '',
      name: '',
      projectId,
      detail: '',
      owner: localStorage.getItem('auth_id'),
      isDone: false,
      comments: [],
      startDate: new Date(),
      dueDate: null
    };
  }

  static fromMap(id, data) {
    const newTask = new Task(data.name, data.detail);
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
