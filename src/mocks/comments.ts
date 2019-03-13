import Comment from '../models/Comment';
import { simpleStudent } from './students';

let simpleComment = new Comment(simpleStudent, new Date(), 'test comment');

export { simpleComment };
