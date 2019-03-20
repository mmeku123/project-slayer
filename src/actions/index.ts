import {
  ADD_PROJECT,
  FETCH_PROJECT,
  ADD_SUBJECT,
  CHANGE_SUBJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT
} from './types';

export const createProject = projectName => ({
  type: ADD_PROJECT,
  projectName
});

export const fetchProject = () => {
  return { type: FETCH_PROJECT };
};

export const createSubject = subjectName => {
  return { type: ADD_SUBJECT, subjectName };
};

export const changeSubject = subjectName => {
  return { type: CHANGE_SUBJECT, subjectName };
};

export const changeProject = projectName => {
  return { type: CHANGE_PROJECT, projectName };
};

export const changeProjectBySubject = subject => {
  return { type: CHANGE_PROJECT_SUBJECT, subject };
};
