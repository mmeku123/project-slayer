import {
  AUTH_USER,
  ADD_PROJECT_MEMBER,
  LOG_OUT_USER,
  FETCH_USER
} from './types';

import {
  showNotification,
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification
} from './actor';

import firebase from '../firebase';
import { Student } from '../models';

const db = firebase.firestore();
const users = db.collection('users');

export const addStudent = studentId => async dispatch => {
  users
    .doc(studentId)
    .get()
    .then(doc => {
      const { id, name, nickname, email, phone, job, img } = doc.data();
      const member = new Student(
        doc.id,
        id,
        name,
        nickname,
        email,
        phone,
        job,
        img
      );
      return { type: ADD_PROJECT_MEMBER, payload: member };
    });
};

const createUser = (user: firebase.User, profile) => async dispatch => {
  dispatch(showLoadingNotification('Signing up...'));

  users
    .doc(user.uid)
    .set(Student.toJson(user.uid, profile))
    .then(() => {
      dispatch(fetchUser(user.uid));
    })
    .catch(error => dispatch(showErrorNotification(error.message)));
};

const fetchUser = (userId: string) => async dispatch => {
  users
    .doc(userId)
    .get()
    .then(doc => {
      const user = Student.fromMap(doc.id, doc.data());

      return dispatch({ type: FETCH_USER, payload: { user } });
    })
    .catch(error => dispatch(showErrorNotification(error.message)));
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
      dispatch(createUser(user.user, profile));
      dispatch(showSuccessNotification('Sign up !'));
      dispatch(signInUser(email, password));
    })
    .catch(error => {
      dispatch(showErrorNotification(error.message));
    });
};

export const signInUser = (
  email: string,
  password: string
) => async dispatch => {
  dispatch(showLoadingNotification('Signing in...'));

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      let user = firebase.auth().currentUser;

      if (user) {
        localStorage.setItem('auth_id', user.uid);
        localStorage.setItem('auth_email', email);
        localStorage.setItem('auth_password', password);
        console.log('log in as id ', localStorage.getItem('auth_id'));
        dispatch({ type: AUTH_USER, payload: { userId: user.uid } });
        dispatch(showSuccessNotification('Sign in !'));
      }
    })
    .catch(error => {
      dispatch(showErrorNotification(error.message));
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
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: LOG_OUT_USER });
      dispatch(showNotification('Log out !'));
    });
};
