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

  static toJson(_id, email) {
    return {
      _id,
      email,
      id: '',
      name: '',
      nickname: '',
      phone: '',
      job: ''
    };
  }

  static fromMap(_id, data) {
    const newStudent = new Student(
      _id,
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
