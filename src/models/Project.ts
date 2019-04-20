import Task from './Task';
import Comment from './Comment';
import Student from './User/Student';
import moment from 'moment';
import projects from '../reducers/projects';
import ProjectIcon from '../images/project';

class Project {
  _id: string;
  name: string;
  detail: string = '';

  tasks: Task[] = [];
  studentIds: string[] = [];
  commentIds: string[] = [];

  img: string;

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
    newProject.img = data.img;

    return newProject;
  }

  static toJson(name, studentId) {
    const studentIdList = studentId ? [studentId] : [];

    return {
      name,
      detail: '',
      tasks: [],
      studentIds: studentIdList,
      commentIds: [],
      schedule: ProjectSchedule.toJson(new ProjectSchedule())
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
  dueDate: string;

  img: string;

  constructor(
    id: string,
    name: string,
    detail: string,
    dueDate: string,
    img: string
  ) {
    this._id = id;
    this.name = name;
    this.detail = detail;
    this.dueDate = dueDate;
    this.img = img;
  }

  static toJson(sprint: ProjectSprint) {
    return {
      _id: sprint._id,
      name: sprint.name,
      detail: sprint.detail,
      dueDate: sprint.dueDate,
      img: sprint.img
    };
  }
}

class ProjectSchedule {
  _id: string;
  startDate: string;

  sprints: ProjectSprint[] = [];

  constructor(_id?: string, startDate: string = moment().format('L')) {
    if (_id) this._id = _id;
    this.startDate = startDate;
  }

  static toJson(schedule: ProjectSchedule) {
    return {
      startDate: schedule.startDate,
      sprints: schedule.sprints
    };
  }

  static fromMap(data) {
    const schedule = new ProjectSchedule(data._id, data.startDate);
    schedule.sprints = data.sprints.map((sprint: ProjectSprint) => {
      return new ProjectSprint(
        sprint._id,
        sprint.name,
        sprint.detail,
        sprint.dueDate,
        sprint.img
      );
    });
  }
}

export default Project;
export { Project, ProjectProgress, ProjectSchedule, ProjectSprint };
