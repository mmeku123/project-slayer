import User from './User/User';

class Comment {
  _id: string;
  ownerId: string;
  time: Date;
  detail: string;

  constructor(id: string, owner: string, time: Date, detail: string) {
    this._id = id;
    this.ownerId = owner;
    this.time = time;
    this.detail = detail;
  }

  static toJson(id: string, authId: string, time: Date, detail: string) {
    return {
      _id: id,
      ownerId: authId,
      createTime: time,
      detail: detail
    };
  }

  static fromMap(data) {
    const newComment = new Comment(
      data._id,
      data.ownerId,
      data.createTime,
      data.detail
    );
    return newComment;
  }
}

export default Comment;
