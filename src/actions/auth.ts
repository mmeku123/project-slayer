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

const createUser = (user: firebase.User) => async dispatch => {
  users
    .doc(user.uid)
    .set(Student.toJson(user.uid, user.email))
    .then(() => dispatch(fetchUser(user.uid)));
};

const fetchUser = (userId: string) => async dispatch => {
  users
    .doc(userId)
    .get()
    .then(doc => {
      const user = Student.fromMap(doc.id, doc.data());

      return dispatch({ type: FETCH_USER, payload: { user } });
    });
};

export const signUpUser = (
  email: string,
  password: string,
  profile
) => async dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(createUser(user.user));
      dispatch(signInUser(email, password));
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(error.code, error.message);
    });
};

export const signInUser = (
  email: string,
  password: string
) => async dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      let user = firebase.auth().currentUser;

      if (user) {
        localStorage.setItem('auth_id', user.uid);
        localStorage.setItem('auth_email', email);
        localStorage.setItem('auth_password', password);
        return dispatch({ type: AUTH_USER, payload: { userId: user.uid } });
      }
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const autoAuth = () => async dispatch => {
  const email = localStorage.getItem('auth_email');
  const password = localStorage.getItem('auth_password');

  if (email && password) {
    return dispatch(signInUser(email, password));
  }
};

export const logOutUser = () => async dispatch => {
  localStorage.removeItem('auth_id');
  localStorage.removeItem('auth_email');
  localStorage.removeItem('auth_password');

  console.log('logout');

  firebase
    .auth()
    .signOut()
    .then(() => {
      return dispatch({ type: LOG_OUT_USER });
    });
};
