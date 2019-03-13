import Task from '../task';
import Student from '../User/Student';
import ProjectSchedule from './ProjectSchedule';
import ProjectProgress from './ProjectProgress';

class Project {
  name: string;
  detail: string;

  tasks: Task[];
  students: Student[];
  comment: Comment[];

  progress: ProjectProgress;
  schedule: ProjectSchedule;

  constructor(name: string) {
    this.name = name;
  }
}

export default Project;
