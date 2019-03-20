import {
  ADD_PROJECT,
  FETCH_PROJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT
} from '../actions/types';
import Project from '../models/Project';
import { student, student2 } from '../mocks/students';
import { simpleComment, simpleComment2 } from '../mocks/comments';
import { simpleProjects, simpleProjects2 } from '../mocks/projects';
import { Subject } from '../models';

function newProject(name: string): Project {
  let project = new Project(name);
  project.comments = [simpleComment];
  project.detail = 'project1';
  project.members = [student, student2];
  project.addProjectTaskByMember();

  return project;
}

const initialState = {
  projects: [],
  focusProject: {},
  isFocusProject: false
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT:
      let project = newProject(action.projectName);
      return { ...state, projects: [...state.projects, project] };
    case FETCH_PROJECT:
      return state;

    case CHANGE_PROJECT:
      return {
        ...state,
        focusProject: state.projects.find(project => {
          return project.name == action.projectName;
        }),
        isFocusProject: true
      };

    case CHANGE_PROJECT_SUBJECT:
      let subject: Subject = action.subject;
      return {
        ...state,
        projects: subject.projects,
        focusProject: subject.projects[0],
        isFocusProject: false
      };
    default:
      return state;
  }
}
