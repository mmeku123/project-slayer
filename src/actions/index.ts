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
  ADD_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  ADD_STUDENT,
  CREATE_STUDENT,
  AUTH_USER,
  ADD_PROJECT_MEMBER,
  FETCH_PROJECT_MEMBERS
} from './types';

import Project from '../models/Project';

import axios from 'axios';
import firebase from '../firebase';
import { Subject, Student } from '../models';
import { EditType } from '../constant/editType';

const db = firebase.firestore();
const projects = db.collection('projects');
const subjects = db.collection('subjects');
const comments = db.collection('comments');
const users = db.collection('users');

const authId = localStorage.getItem('auth_id');

export const createProject = (
  projectName: string,
  subjectId: string
) => async dispatch => {
  dispatch({ type: ADD_PROJECT, payload: null });

  const req = await projects.add(Project.toJson(projectName, authId));

  dispatch({
    type: ADD_PROJECT_SUCCESS,
    payload: { id: req.id, name: projectName, studentId: authId }
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

  const projectList = [];

  const resProjects = req.docs.forEach(doc => {
    if (projectIds) {
      if (projectIds.find(id => id == doc.id))
        projectList.push(Project.fromMap(doc.id, doc.data()));
    }
  });

  return dispatch({ type: FETCH_PROJECT, payload: { projects: projectList } });
};

export const fetchSubject = () => async dispatch => {
  const req = await subjects.get();
  const res = req.docs.map(doc => Subject.fromMap(doc.id, doc.data()));

  return dispatch({ type: FETCH_SUBJECT, payload: res });
};

export const createSubject = subjectName => async dispatch => {
  dispatch({ type: ADD_SUBJECT });

  const req = subjects.add(Subject.toJson(subjectName, authId)).then(ref => {
    return dispatch({
      type: ADD_SUBJECT_SUCCESS,
      payload: { id: ref.id, name: subjectName, studentId: authId }
    });
  });
};

export const fetchProjectMembers = projectId => async dispatch => {
  const members = [];

  projects
    .doc(projectId)
    .get()
    .then(doc => {
      doc.data().studentIds.forEach(studentId => {
        users
          .doc(studentId)
          .get()
          .then(doc => {
            members.push(Student.fromMap(doc.id, doc.data()));
          })
          .then(() => {
            return dispatch({
              type: FETCH_PROJECT_MEMBERS,
              payload: members
            });
          });
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

export const createStudent = () => {
  return { type: CREATE_STUDENT };
};

export const authStudent = () => async dispatch => {
  const studentId = '2dEeCuhsAft4cRkFa5px';

  localStorage.setItem('auth_id', studentId);

  return dispatch({ type: AUTH_USER });
};

export const addStudent = studentId => {
  users
    .doc(studentId)
    .get()
    .then(doc => {
      const { id, name, nickname, email, phone, job } = doc.data();
      const member = new Student(doc.id, id, name, nickname, email, phone, job);
      return { type: ADD_PROJECT_MEMBER, payload: member };
    });
};

export const editProject = (
  projectId,
  editType: EditType,
  value
) => async dispatch => {
  dispatch({ type: EDIT_PROJECT });

  switch (editType) {
    case EditType.DETAIL:
      projects
        .doc(projectId)
        .update({
          detail: value
        })
        .then(() => {
          projects
            .doc(projectId)
            .get()
            .then(doc => {
              return dispatch({
                type: EDIT_PROJECT_SUCCESS,
                payload: {
                  projectId,
                  editType,
                  detail: doc.data().detail
                }
              });
            });
        });
  }
};
