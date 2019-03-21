import Subject from '../models/Subject';
import { simpleProjects, simpleProjects2 } from './projects';

let subject1 = new Subject('subject1', 'subject1');
let subject2 = new Subject('subject2', 'subject2');
subject1.projects = simpleProjects;
subject2.projects = simpleProjects2;
let subjects = [subject1, subject2];

let _subjectId = 0;
subject1._id = _subjectId++;
subject2._id = _subjectId++;

export default subjects;
export { _subjectId };
