import Teacher from './User/Teacher';
import Student from './User/Student';
import Project from './Project';

class Subject {
  id: string;
  name: string;
  owner?: Teacher;

  students: Student[] = [];

  projects: Project[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default Subject;
