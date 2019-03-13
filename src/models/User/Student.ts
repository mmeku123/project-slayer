import Task from '../Task';

class Student {
  id: string;
  name: string;
  nickname?: string;
  email: string;
  phone: string;

  tasks?: Task[];

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    nickname?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    if (nickname) this.nickname = nickname;
  }
}

export default Student;
