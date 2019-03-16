import Comment from '../models/Comment';
import { student, student2 } from './students';

let simpleComment = new Comment(student, new Date(), 'test comment');
let simpleComment2 = new Comment(
  student2,
  new Date(),
  'test comment from student2'
);

export { simpleComment, simpleComment2 };
