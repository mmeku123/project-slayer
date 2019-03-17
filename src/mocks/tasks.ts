import { Task, Project } from '../models';

import { simpleProjects } from './projects';

const task1 = new Task('hello world!', 'print hello world to screen');
task1.isDone = true;
task1.startDate = new Date();
task1.dueDate = new Date();
const task2 = new Task('eieiza!', 'be a eiei za for your team');
task2.isDone = false;
task2.startDate = new Date();
task2.dueDate = new Date();

let tasks = [task1, task2];

export { tasks };
