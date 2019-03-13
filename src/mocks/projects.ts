import { Project, ProjectProgress, ProjectSchedule } from '../models/Project';
import { simpleComment } from './comments';

let simpleProject = new Project('simpleProject');
simpleProject.comment = [simpleComment];
simpleProject.detail = '';
console.log(simpleProject);
export { simpleProject };
