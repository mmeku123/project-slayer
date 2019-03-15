import Task from '../Task';

class Student {
  id: string;
  name: string;
  nickname?: string;
  email: string;
  phone: string;
  job: String;
  tasks?: Task[];

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    job: string,
    nickname?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.job = job;
    if (nickname) this.nickname = nickname;
  }
}

export default Student;
