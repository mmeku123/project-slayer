import User from './User/User';

class Comment {
  _id: string;
  ownerId: string;
  time: Date;
  detail: string;

  constructor(owner: string, time: Date, detail: string) {
    this.ownerId = owner;
    this.time = time;
    this.detail = detail;
  }

  static toJson(authId: string, time: Date, detail: string) {
    return {
      ownerId: authId,
      createTime: time,
      detail: detail
    };
  }

  static fromMap(data) {
    const newComment = new Comment(data.ownerId, data.createTime, data.detail);
    return newComment;
  }
}

export default Comment;
