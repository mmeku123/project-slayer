import Task from './Task';
import Comment from './Comment';
import Student from './User/Student';

class Project {
  _id: number;
  name: string;
  detail: string = '';

  tasks: Task[] = [];
  members: Student[] = [];
  comments: Comment[] = [];

  progress?: ProjectProgress;
  schedule?: ProjectSchedule;

  constructor(name: string) {
    this.name = name;
  }

  addProjectTaskByMember() {
    return this.members.forEach(member => {
      member.tasks.forEach(task => {
        if (!task.owners.find(owner => owner == member.name))
          task.owners.push(member.name);
        this.tasks.push(task);
      });
    });
  }
}

class ProjectProgress {
  _id: number;
  progresses: Progress[] = [];
  percentCompleted: number;
}

class Progress {
  _id: number;
  name: string;
  detail: string;
  isStart: boolean = false;
  isDone: boolean = false;

  constructor(name: string) {
    this.name = name;
  }
}

class ProjectSprint {
  _id: number;
  name: string;
  detail: string;
  dueDate: Date;

  constructor(name: string, detail: string, dueDate: string) {
    this.name = name;
    this.detail = detail;
    this.dueDate = new Date(dueDate);
  }
}

class ProjectSchedule {
  _id: number;
  startDate: Date;

  sprints: ProjectSprint[] = [];

  constructor(startDate: Date) {
    this.startDate = startDate;
  }
}

export default Project;
export { Project, ProjectProgress, ProjectSchedule, ProjectSprint };
