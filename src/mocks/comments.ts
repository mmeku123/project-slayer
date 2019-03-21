import Comment from '../models/Comment';
import { student, student2 } from './students';

let _commentId = 0;
let simpleComment = new Comment(student.name, new Date(), 'test comment');
let simpleComment2 = new Comment(
  student2.name,
  new Date(),
  'test comment from student2'
);

simpleComment._id = _commentId++;
simpleComment._id = _commentId++;

export { simpleComment, simpleComment2, _commentId };
