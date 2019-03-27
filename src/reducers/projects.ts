import {
  ADD_PROJECT,
  FETCH_PROJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT,
  EDIT_PROJECT
} from '../actions/types';
import Project from '../models/Project';
import Comment from '../models/Comment';
import { Subject } from '../models';
import { EditType } from '../constant/editType';

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
      const { id, name } = action.payload;
      const project = new Project(id, name);
      return { ...state, projects: [...state.projects, project] };
    case FETCH_PROJECT:
      return { ...state, projects: action.payload };
    case CHANGE_PROJECT:
      console.log(state.projects);
      return {
        ...state,
        focusProject: state.projects.find(project => {
          return project._id == action.projectId;
        }),
        isFocusProject: true
      };

    case CHANGE_PROJECT_SUBJECT:
      let subject: Subject = action.subject;
      return null;

    case EDIT_PROJECT:
      console.log('redux' + action.payload);
      switch (action.editType) {
        case EditType.DETAIL:
          return {
            ...state,
            projects: state.projects.map(project => {
              if (project._id == action.projectId) {
                project.detail = action.payload;
                return project;
              } else return project;
            }),
            focusProject: state.projects.find(
              project => project._id == action.projectId
            )
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
