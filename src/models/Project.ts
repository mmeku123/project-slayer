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

class ProjectSchedule {
  startDate: Date;
  endDate: Date;

  sprints: ProjectProgress[] = [];

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export default Project;
export { Project, ProjectProgress, ProjectSchedule };
