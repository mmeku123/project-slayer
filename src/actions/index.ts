import { CHANGE_PROJECT_SUBJECT, CREATE_STUDENT } from './types';

import firebase from '../firebase';

const db = firebase.firestore();

export const changeProjectBySubject = subject => {
  return { type: CHANGE_PROJECT_SUBJECT, subject };
};

export const createStudent = () => {
  return { type: CREATE_STUDENT };
};

export {
  addStudent,
  authStudent,
  autoAuth,
  logOutUser,
  signInUser,
  signUpUser
} from './auth';
export {
  addProjectMember,
  addProjectToSubject,
  addSprint,
  changeProject,
  createProject,
  deleteProject,
  deleteSprint,
  editProject,
  fetchProjectByIds,
  fetchProjectMembers,
  updateProject
} from './project';
export {
  addSubjectMember,
  changeSubject,
  createSubject,
  deleteSubject,
  fetchSubject
} from './subject';
export { addTask, editTask, fetchTasks } from './task';
