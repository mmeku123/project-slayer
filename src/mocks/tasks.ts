import { Task, Project, Comment } from '../models';

import { simpleProjects } from './projects';

const task1 = new Task('hello world!', 'print hello world to screen');
task1.isDone = true;
task1.startDate = new Date();
task1.dueDate = new Date();
task1.comments = [
  new Comment('tusave', new Date(), 'this is too ez'),
  new Comment('tusave', new Date('2014-11-12'), 'finished!')
];
const task2 = new Task('eieiza!', 'be a eiei za for your team');
task2.isDone = false;
task2.startDate = new Date();
task2.dueDate = new Date();
task2.comments = [
  new Comment('tusave', new Date('2016-12-12'), 'please vote for me'),
  new Comment('tusave', new Date('2014-11-12'), 'finished!')
];

let tasks = [task1, task2];

export { tasks };
