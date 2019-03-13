class Task {
  priority?: number;
  name: string;
  detail: string = '';

  startDate?: Date;
  dueDate?: Date;

  constructor(name: string) {
    this.name = name;
  }
}

export default Task;
