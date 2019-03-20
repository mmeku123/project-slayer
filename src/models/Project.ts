import Task from './Task';
import Comment from './Comment';
import Student from './User/Student';

class Project {
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
        this.tasks.push(task);
      });
    });
  }
}

class ProjectProgress {
  progresses: Progress[] = [];
  percentCompleted: number;
}

class Progress {
  name: string;
  detail: string;
  isStart: boolean = false;
  isDone: boolean = false;

  constructor(name: string) {
    this.name = name;
  }
}

class ProjectSprint {
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
  startDate: Date;

  sprints: ProjectSprint[] = [];

  constructor(startDate: Date) {
    this.startDate = startDate;
  }
}

export default Project;
export { Project, ProjectProgress, ProjectSchedule, ProjectSprint };
