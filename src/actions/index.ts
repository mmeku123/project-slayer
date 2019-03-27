import {
  ADD_PROJECT,
  ADD_SUBJECT_SUCCESS,
  ADD_PROJECT_SUBJECT,
  FETCH_PROJECT,
  ADD_SUBJECT,
  CHANGE_SUBJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT,
  EDIT_PROJECT,
  FETCH_SUBJECT,
  ADD_PROJECT_SUCCESS
} from './types';

import Project from '../models/Project';

import axios from 'axios';
import firebase from '../firebase';
import { Subject } from '../models';
import { EditType } from '../constant/editType';

const db = firebase.firestore();
const projects = db.collection('projects');
const subjects = db.collection('subjects');
const comments = db.collection('comments');

export const createProject = (
  projectName: string,
  subjectId: string
) => async dispatch => {
  dispatch({ type: ADD_PROJECT, payload: null });

  const req = await projects.add(Project.toJson(projectName));

  dispatch({
    type: ADD_PROJECT_SUCCESS,
    payload: { id: req.id, name: projectName }
  });
  return dispatch(addProjectToSubject(req.id, subjectId));
};

export const addProjectToSubject = (
  projectId: string,
  subjectId: string
) => async dispatch => {
  const req = await subjects.doc(subjectId);
  const doc = await req.get();
  const projectIds = await doc.data().projectIds;
  await req.update({ projectIds: [...projectIds, projectId] });

  return dispatch({
    type: ADD_PROJECT_SUBJECT,
    payload: { projectId, subjectId }
  });
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
  dispatch({ type: ADD_SUBJECT });

  const req = subjects.add(Subject.toJson(subjectName)).then(ref => {
    return dispatch({
      type: ADD_SUBJECT_SUCCESS,
      payload: { id: ref.id, name: subjectName }
    });
  });
};

export const changeSubject = subjectId => async dispatch => {
  return dispatch({ type: CHANGE_SUBJECT, subjectId });
};

export const changeProject = projectId => {
  return { type: CHANGE_PROJECT, projectId };
};

export const changeProjectBySubject = subject => {
  return { type: CHANGE_PROJECT_SUBJECT, subject };
};

export const editProject = (
  projectId,
  editType: EditType,
  value
) => async dispatch => {
  switch (editType) {
    case EditType.DETAIL:
      const req = await projects.doc(projectId);
      req
        .update({
          detail: value
        })
        .then(res => {
          projects
            .doc(projectId)
            .get()
            .then(doc => {
              return dispatch({
                type: EDIT_PROJECT,
                projectId,
                editType,
                payload: doc.data().detail
              });
            });
        });
  }
};
