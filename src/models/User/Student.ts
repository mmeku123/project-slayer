import Task from '../Task';
import User from './User';

class Student implements User {
  _id: string;
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  job: string;
  img: string;

  constructor(
    _id: string,
    id: string,
    name: string,
    nickname: string,
    email: string,
    phone: string,
    job: string,
    img: string
  ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.job = job;
    this.nickname = nickname;
    this.img = img;
  }

  static toJson(_id, data) {
    return {
      _id,
      email: data.email,
      id: data.id,
      name: data.name,
      phone: data.phone,
      job: data.job,
      img: data.img
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
      data.job,
      data.img
    );

    return newStudent;
  }
}

export default Student;
