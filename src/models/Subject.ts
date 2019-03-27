import Teacher from './User/Teacher';

class Subject {
  _id: string;
  id: string;
  name: string;
  owner?: Teacher;

  studentIds: string[] = [];

  projectIds: string[] = [];

  constructor(id: string, name: string) {
    this._id = id;
    this.name = name;
  }

  static fromMap(id, map): Subject {
    const newSubject = new Subject(id, map.name);
    newSubject.id = map.id;
    newSubject.projectIds = map.projectIds;
    newSubject.studentIds = map.studentIds;
    newSubject.owner = map.owner;
    return newSubject;
  }

  static toJson(name) {
    return {
      name,
      id: '',
      owner: '',
      studentIds: [],
      projectIds: []
    };
  }
}

export default Subject;
