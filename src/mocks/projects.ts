import {
  Project,
  ProjectProgress,
  ProjectSchedule,
  ProjectSprint
} from '../models/Project';
import { student, student2 } from './students';
import { simpleComment, simpleComment2 } from './comments';

let _timelineId = 0;

let timeline1 = new ProjectSchedule(new Date());
timeline1._id = _timelineId++;
timeline1.sprints = [
  new ProjectSprint('sprint1', 'demo1', '2019-08-12'),
  new ProjectSprint('sprint2', 'prototype day', '2019-09-12'),
  new ProjectSprint(
    'semi boss',
    'everything must be almost finish',
    '2019-10-12'
  ),
  new ProjectSprint('final boss', 'launching day', '2019-12-12')
];
let timeline2 = new ProjectSchedule(new Date());
timeline2.sprints = [
  new ProjectSprint('sprint1', 'demo1', '2019-08-12'),
  new ProjectSprint('sprint2', 'prototype day', '2019-09-12'),
  new ProjectSprint(
    'semi boss',
    'everything must be almost finish',
    '2019-10-12'
  ),
  new ProjectSprint('final boss', 'launching day', '2019-12-12')
];
timeline2._id = _timelineId++;

let simpleProject1 = new Project('simpleProject1');
simpleProject1.comments = [simpleComment];
simpleProject1.detail = 'project1';
simpleProject1.members = [student, student2];
simpleProject1.addProjectTaskByMember();
simpleProject1.schedule = timeline1;
let _projectId = 0;
simpleProject1._id = _projectId++;

let simpleProject2 = new Project('simpleProject2');
simpleProject2.comments = [simpleComment, simpleComment2];
simpleProject2.detail = 'project2';
simpleProject2.members = [student];
simpleProject2.addProjectTaskByMember();
simpleProject2.schedule = timeline2;
simpleProject2._id = _projectId++;

let simpleProject3 = new Project('simpleProject3');
simpleProject3.comments = [simpleComment];
simpleProject3.detail = 'project3';
simpleProject3.members = [student2];
simpleProject3.addProjectTaskByMember();
simpleProject3._id = _projectId++;

let simpleProjects = [simpleProject1, simpleProject2, simpleProject3];
let simpleProjects2 = [simpleProject2, simpleProject3];

export {
  simpleProject1,
  simpleProjects,
  simpleProjects2,
  _projectId,
  _timelineId
};
