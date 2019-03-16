import User from './User/User';

class Comment {
  owner: User;
  time: Date;
  detail: string;

  constructor(owner: User, time: Date, detail: string) {
    this.owner = owner;
    this.time = time;
    this.detail = detail;
  }
}

export default Comment;
