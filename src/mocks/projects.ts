import { Project, ProjectProgress, ProjectSchedule } from '../models/Project';
import { simpleComment } from './comments';

let simpleProject1 = new Project('simpleProject1');
simpleProject1.comment = [simpleComment];
simpleProject1.detail = 'project1';
let simpleProject2 = new Project('simpleProject2');
simpleProject2.comment = [simpleComment];
simpleProject2.detail = 'project2';
let simpleProject3 = new Project('simpleProject3');
simpleProject3.comment = [simpleComment];
simpleProject3.detail = 'project3';

let simpleProjects = [simpleProject1, simpleProject2, simpleProject3];

export { simpleProject1, simpleProjects };
