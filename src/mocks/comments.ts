import Comment from '../models/Comment';
import { student, student2 } from './students';

let simpleComment = new Comment(student.name, new Date(), 'test comment');
let simpleComment2 = new Comment(
  student2.name,
  new Date(),
  'test comment from student2'
);

export { simpleComment, simpleComment2 };
