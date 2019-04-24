import Teacher from './User/Teacher';
import SubjectIcon from '../images/subject';

class Subject {
  _id: string;
  id: string;
  name: string;
  detail: string;
  img: string;

  studentIds: string[] = [];

  projectIds: string[] = [];

  constructor(id: string, name: string) {
    this._id = id;
    this.name = name;
  }

  static fromMap(id, data): Subject {
    const newSubject = new Subject(id, data.name);
    newSubject.id = data.id;
    newSubject.projectIds = data.projectIds;
    newSubject.studentIds = data.studentIds;
    newSubject.detail = data.detail;
    newSubject.img = data.img;
    return newSubject;
  }

  static toJson(name, studentId, subject) {
    const studentIdList = studentId ? [studentId] : [];

    return {
      name,
      id: subject.id || '',
      detail: subject.detail || '',
      studentIds: studentIdList,
      projectIds: []
    };
  }
}

export default Subject;
