import {
  ADD_PROJECT,
  FETCH_PROJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT,
  EDIT_PROJECT
} from '../actions/types';
import Project from '../models/Project';
import { student, student2 } from '../mocks/students';
import { simpleComment, simpleComment2 } from '../mocks/comments';
import {
  simpleProjects,
  simpleProjects2,
  _projectId,
  _timelineId
} from '../mocks/projects';
import { Subject } from '../models';

function newProject(name: string): Project {
  let project = new Project(name);
  project.comments = [simpleComment];
  project.detail = 'project1';
  project.members = [student, student2];
  project.addProjectTaskByMember();
  project._id = _projectId;
  return project;
}

const initialState: {
  projects: Project[];
  focusProject: Project;
  isFocusProject: boolean;
} = {
  projects: [],
  focusProject: null,
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

    case EDIT_PROJECT:
      console.log('redux' + action.payload);
      switch (action.editType) {
        case 'detail':
          return {
            ...state,
            projects: state.projects.map(project => {
              if (project.name == action.projectName) {
                project.detail = action.payload;
                return project;
              } else return project;
            })
          };
        case 'member':
          return null;
        case 'task':
          return {
            ...state,
            projects: state.projects.map(project => {
              if (project.name == action.projectName) {
                project.tasks.map(task => {
                  if (task.name == action.payload.taskName) {
                    task.detail = action.payload.editDetail.detail;
                    return task;
                  }
                  return task;
                });
              }
            })
          };
        case 'comment':
          return null;
        case 'progress':
          return null;
        case 'timeline':
          return null;
      }
    default:
      return state;
  }
}
