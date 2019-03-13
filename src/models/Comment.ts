import Student from './User/Student';

class Comment {
  owner: Student;
  time: Date;
  detail: string;

  constructor(owner: Student, time: Date, detail: string) {
    this.owner = owner;
    this.time = time;
    this.detail = detail;
  }
}

export default Comment;
