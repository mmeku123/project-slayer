import {
  ADD_PROJECT,
  UPDATE_PROJECT,
  FETCH_PROJECTS,
  CHANGE_SUBJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT,
  EDIT_PROJECT,
  ADD_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  TOGGLE_SHOW_PROJECT
} from '../actions/types';
import Project, { ProjectSprint } from '../models/Project';
import Comment from '../models/Comment';
import { Subject } from '../models';
import EditType from '../constant/editType';

import members from './members';

const initialState: {
  projects: Project[];
  focusProject: Project;
  isFocusProject: boolean;
  isLoading: boolean;
} = {
  projects: [],
  focusProject: null,
  isFocusProject: false,
  isLoading: false
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return { ...state, isLoading: true };
    case ADD_PROJECT_SUCCESS:
      const { id, name, studentId } = action.payload;
      const project = new Project(id, name);
      project.studentIds = [studentId];
      return { ...state, projects: [...state.projects, project] };
    case UPDATE_PROJECT:
      const updateProject = action.payload.project;

      return {
        ...state,
        projects: state.projects.map((project: Project) => {
          if (project._id == action.payload.project._id) {
            project = updateProject;
            return project;
          }
          return project;
        }),
        focusProject: updateProject
      };
    case FETCH_PROJECTS:
      return {
        ...state,
        isFocusProject: false,
        projects: action.payload.projects
      };
    case TOGGLE_SHOW_PROJECT:
      return { ...state, isFocusProject: false };
    case CHANGE_PROJECT:
      return {
        ...state,
        focusProject: state.projects.find(project => {
          return project._id == action.projectId;
        }),
        isFocusProject: true
      };
    case EDIT_PROJECT:
      return { ...state, isLoading: true };
    case EDIT_PROJECT_SUCCESS:
      const { projectId } = action.payload;
      switch (action.payload.editType) {
        case EditType.DETAIL:
          const { detail } = action.payload;

          const editProject = state.projects.find(
            project => project._id == projectId
          );
          editProject.detail = detail;
          return {
            ...state,
            isLoading: false,
            projects: state.projects.map(project => {
              if (project._id == projectId) {
                project.detail = detail;
                return project;
              } else return project;
            }),
            focusProject: editProject
          };
        case EditType.TIMELINE:
          const { editResult } = action.payload;
          const updateProject = state.projects.find(
            project => project._id == projectId
          );
          updateProject.schedule.sprints = updateProject.schedule.sprints.map(
            sprint => {
              return new ProjectSprint(
                sprint._id,
                sprint.name,
                sprint.detail,
                sprint.dueDate
              );
            }
          );
          return {
            ...state,
            isLoading: false,
            projects: state.projects.map(project => {
              if (project._id == projectId) {
                project = updateProject;
                return project;
              } else return project;
            }),
            focusProject: updateProject
          };
      }
    default:
      return state;
  }
}
