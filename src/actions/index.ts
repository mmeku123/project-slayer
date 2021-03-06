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
  updateProject,
  updateProjectImage
} from './project';
export {
  addSubjectMember,
  changeSubject,
  createSubject,
  deleteSubject,
  fetchSubject,
  updateSubjectImage
} from './subject';
export { addTask, editTask, fetchTasks, voteTask } from './task';
