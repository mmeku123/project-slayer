import Task from './Task';
import Comment from './Comment';
import Student from './User/Student';

class Project {
  _id: string;
  name: string;
  detail: string = '';

  tasks: Task[] = [];
  studentIds: string[] = [];
  commentIds: string[] = [];

  progress?: ProjectProgress;
  schedule?: ProjectSchedule;

  constructor(id: string, name: string) {
    this._id = id;
    this.name = name;
  }

  static fromMap(id, data) {
    const newProject = new Project(id, data.name);
    newProject.detail = data.detail;
    newProject.tasks = data.tasks;
    newProject.studentIds = data.studentIds;
    newProject.commentIds = data.commentIds;
    newProject.progress = data.progress;
    newProject.schedule = data.schedule;

    return newProject;
  }

  static toJson(name) {
    return {
      name,
      detail: '',
      tasks: [],
      studentIds: [],
      commentIds: [],
      progress: null,
      schedule: null
    };
  }
}

class ProjectProgress {
  _id: string;
  progresses: Progress[] = [];
  percentCompleted: number;
}

class Progress {
  _id: string;
  name: string;
  detail: string;
  isStart: boolean = false;
  isDone: boolean = false;

  constructor(name: string) {
    this.name = name;
  }
}

class ProjectSprint {
  _id: string;
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
  _id: string;
  startDate: Date;

  sprints: ProjectSprint[] = [];

  constructor(startDate: Date) {
    this.startDate = startDate;
  }
}

export default Project;
export { Project, ProjectProgress, ProjectSchedule, ProjectSprint };
