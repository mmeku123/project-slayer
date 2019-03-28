import Task from '../Task';
import User from './User';

class Student implements User {
  _id: string;
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  job: String;

  constructor(
    _id: string,
    id: string,
    name: string,
    nickname: string,
    email: string,
    phone: string,
    job: string
  ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.job = job;
    this.nickname = nickname;
  }

  static fromMap(id, data) {
    const newStudent = new Student(
      id,
      data.id,
      data.name,
      data.nickname,
      data.email,
      data.phone,
      data.job
    );

    return newStudent;
  }
}

export default Student;
