import {
  ADD_PROJECT,
  ADD_PROJECT_SUBJECT,
  FETCH_PROJECT,
  ADD_SUBJECT,
  CHANGE_SUBJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT,
  EDIT_PROJECT,
  FETCH_SUBJECT
} from './types';

import Project from '../models/Project';

import axios from 'axios';
import firebase from '../firebase';
import { Subject } from '../models';

const db = firebase.firestore();
const projects = db.collection('projects');
const subjects = db.collection('subjects');
const comments = db.collection('comments');

export const createProject = (
  projectName: string,
  subjectId: string
) => async dispatch => {
  const req = await projects.add(Project.toJson(projectName));

  const res = await req.id;
  dispatch(addProjectToSubject(req.id, subjectId));
  return dispatch({ type: ADD_PROJECT, payload: res });
};

export const addProjectToSubject = (
  projectId: string,
  subjectId: string
) => async dispatch => {
  const req = await subjects.doc(subjectId);
  const doc = await req.get();
  const projectIds = await doc.data().projectIds;
  const res = await req.update({ projectIds: [...projectIds, projectId] });

  return dispatch({ type: ADD_PROJECT_SUBJECT, payload: res });
};

export const fetchProjectByIds = (projectIds: string[]) => async dispatch => {
  const req = await projects.get();

  const res = req.docs.map(doc => {
    if (projectIds && projectIds.find(projectId => projectId == doc.id))
      return new Project(doc.id, doc.data().name);
  });

  return dispatch({ type: FETCH_PROJECT, payload: res });
};

export const fetchSubject = () => async dispatch => {
  const req = await subjects.get();
  const res = req.docs.map(doc => Subject.fromMap(doc.id, doc.data()));

  return dispatch({ type: FETCH_SUBJECT, payload: res });
};

export const createSubject = subjectName => async dispatch => {
  const req = await subjects.add(Subject.toJson(subjectName));

  const res = req.id;

  return dispatch({ type: ADD_SUBJECT, payload: res });
};

export const changeSubject = subjectId => async dispatch => {
  return dispatch({ type: CHANGE_SUBJECT, subjectId });
};

export const changeProject = projectName => {
  return { type: CHANGE_PROJECT, projectName };
};

export const changeProjectBySubject = subject => {
  return { type: CHANGE_PROJECT_SUBJECT, subject };
};

export const editProject = (projectName, editType, value) => {
  return { type: EDIT_PROJECT, projectName, editType, payload: value };
};
