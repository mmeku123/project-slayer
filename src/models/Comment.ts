import User from './User/User';

class Comment {
  _id: string;
  ownerId: string;
  ownerEmail: string;
  time: string;
  detail: string;

  constructor(
    id: string,
    ownerId: string,
    ownerEmail: string,
    time: string,
    detail: string
  ) {
    this._id = id;
    this.ownerId = ownerId;
    this.ownerEmail = ownerEmail;
    this.time = time;
    this.detail = detail;
  }

  static toJson(
    id: string,
    authId: string,
    authEmail: string,
    time: string,
    detail: string
  ) {
    return {
      _id: id,
      ownerId: authId,
      ownerEmail: authEmail,
      createTime: time,
      detail: detail
    };
  }

  static fromMap(data) {
    const newComment = new Comment(
      data._id,
      data.ownerId,
      data.ownerEmail,
      data.createTime,
      data.detail
    );
    return newComment;
  }
}

export default Comment;
