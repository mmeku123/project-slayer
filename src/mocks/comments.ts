import Comment from '../models/Comment';
import { student } from './students';

let simpleComment = new Comment(student, new Date(), 'test comment');

export { simpleComment };
