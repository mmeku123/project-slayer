import User from './User/User';

class Comment {
  ownerName: string;
  time: Date;
  detail: string;

  constructor(owner: string, time: Date, detail: string) {
    this.ownerName = owner;
    this.time = time;
    this.detail = detail;
  }
}

export default Comment;
