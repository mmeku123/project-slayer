import { Project } from './Project';
import Comment from './Comment';

class Task {
  _id: string;
  priority: number;
  name: string;
  detail: string;

  owners: string[] = [];

  isDone: boolean;
  comments: Comment[] = [];

  startDate?: Date;
  dueDate?: Date;

  constructor(name: string, detail: string) {
    this.name = name;
    this.detail = detail;
  }
}

export default Task;
