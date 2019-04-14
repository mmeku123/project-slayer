import {
  ADD_PROJECT,
  ADD_SUBJECT_SUCCESS,
  ADD_PROJECT_SUBJECT,
  UPDATE_PROJECT,
  FETCH_PROJECTS,
  LOAD_SUBJECT,
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
  FETCH_PROJECT_MEMBERS,
  TOGGLE_SHOW_PROJECT,
  FETCH_TASKS,
  ADD_TASK,
  EDIT_TASK,
  LOG_OUT_USER,
  FETCH_USER
} from './types';

import Project, { ProjectSprint, ProjectSchedule } from '../models/Project';

import axios from 'axios';
import firebase from '../firebase';
import { Subject, Student, Task, Comment } from '../models';
import EditType from '../constant/editType';

const db = firebase.firestore();
const projects = db.collection('projects');
const subjects = db.collection('subjects');
const users = db.collection('users');
const tasks = db.collection('tasks');

const authId = localStorage.getItem('auth_id');

export const fetchSubject = () => async dispatch => {
  const req = await subjects.get();

  const userSubjects: Subject[] = [];

  req.docs.forEach(doc => {
    const isStudentSubject = doc
      .data()
      .studentIds.find(studentId => studentId == authId)
      ? true
      : false;

    if (isStudentSubject)
      userSubjects.push(Subject.fromMap(doc.id, doc.data()));
  });

  return dispatch({ type: FETCH_SUBJECT, payload: userSubjects });
};

export const createSubject = subjectName => async dispatch => {
  dispatch({ type: LOAD_SUBJECT });

  const req = subjects.add(Subject.toJson(subjectName, authId)).then(ref => {
    return dispatch(fetchSubject());
  });
};

export const changeSubject = subjectId => async dispatch => {
  dispatch({ type: TOGGLE_SHOW_PROJECT });
  return dispatch({ type: CHANGE_SUBJECT, subjectId });
};

export const deleteSubject = (subjectId: string) => async dispatch => {
  dispatch({ type: LOAD_SUBJECT });

  subjects
    .doc(subjectId)
    .delete()
    .then(() => dispatch(fetchSubject()));
};

export const addSubjectMember = (subjectId, memberEmail) => async dispatch => {
  subjects
    .doc(subjectId)
    .get()
    .then(doc => {
      const subjectMembers: [] = doc.data().studentIds;

      users
        .where('email', '==', memberEmail)
        .get()
        .then(query => {
          if (query.docs.length == 1) {
            const member = query.docs[0];

            const isDuplicate: boolean = subjectMembers.find(
              subjectMember => subjectMember == member.id
            )
              ? true
              : false;

            if (!isDuplicate) {
              subjects
                .doc(subjectId)
                .update({ studentIds: [...subjectMembers, member.id] })
                .then(() => dispatch(fetchSubject()));
            } else {
              console.log('member duplicate');
            }
          } else {
            console.log('error with the email');
          }
        });
    });
};
