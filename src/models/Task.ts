import { Project } from './Project';

class Task {
  priority?: number;
  name: string;
  detail: string;

  startDate?: Date;
  dueDate?: Date;

  constructor(name: string, detail: string) {
    this.name = name;
    this.detail = detail;
  }
}

export default Task;
