import {
  ADD_PROJECT,
  FETCH_PROJECT,
  CHANGE_SUBJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT,
  EDIT_PROJECT,
  ADD_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS
} from '../actions/types';
import Project from '../models/Project';
import Comment from '../models/Comment';
import { Subject } from '../models';
import { EditType } from '../constant/editType';

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
    case FETCH_PROJECT:
      console.log('fetch');
      return { ...state, projects: action.payload.projects };
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
      switch (action.payload.editType) {
        case EditType.DETAIL:
          const { projectId, detail } = action.payload;

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
        case EditType.COMMENT:
          return null;

        case EditType.TASK:
          return {
            ...state,

            projects: state.projects.map(project => {
              if (project.name == action.projectName) {
                return project.tasks.map(task => {
                  return <Project>{
                    ...project
                    // tasks: tasks.map(task => {
                    //   if (task.name == action.payload.taskName) {
                    //     task.detail = action.payload.editDetail.detail;
                    //     return task;
                    //   } else return task;
                    // })
                  };
                });
              } else return project;
            }),
            focusProject: state.projects.find(
              project => project.name == action.projectName
            )
          };

        case EditType.TASK_COMMENT:
          return {
            ...state,
            projects: state.projects.map(project => {
              if (project.name == action.projectName) {
                return <Project>{
                  ...project
                  // tasks: tasks.map(task => {
                  //   if (task.name == action.payload.taskName) {
                  //     return {
                  //       ...task,
                  //       comments: [
                  //         ...task.comments,
                  //         new Comment(
                  //           'test user',
                  //           new Date(),
                  //           action.payload.newComment
                  //         )
                  //       ]
                  //     };
                  // } else
                  // return task;
                  // })
                };
              } else return project;
            }),
            focusProject: state.projects.find(
              project => project.name == action.projectName
            )
          };

        case EditType.COMMENT:
          return null;
        case EditType.MEMBER:
          return null;
        case EditType.TIMELINE:
          return null;
      }
    default:
      return state;
  }
}
