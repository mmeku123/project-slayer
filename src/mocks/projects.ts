import { Project, ProjectProgress, ProjectSchedule } from '../models/Project';
import { student, student2 } from './students';
import { simpleComment, simpleComment2 } from './comments';

let simpleProject1 = new Project('simpleProject1');
simpleProject1.comments = [simpleComment];
simpleProject1.detail = 'project1';
simpleProject1.members = [student, student2];
let simpleProject2 = new Project('simpleProject2');
simpleProject2.comments = [simpleComment, simpleComment2];
simpleProject2.detail = 'project2';
simpleProject2.members = [student];
let simpleProject3 = new Project('simpleProject3');
simpleProject3.comments = [simpleComment];
simpleProject3.detail = 'project3';
simpleProject3.members = [student2];

let simpleProjects = [simpleProject1, simpleProject2, simpleProject3];
let simpleProjects2 = [simpleProject2, simpleProject3];

export { simpleProject1, simpleProjects, simpleProjects2 };
