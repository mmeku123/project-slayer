import User from './User/User';

class Comment {
  _id: number;
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
