import {
  AUTH_USER,
  ADD_PROJECT_MEMBER,
  LOG_OUT_USER,
  FETCH_USER
} from './types';

import firebase from '../firebase';
import { Student } from '../models';

const db = firebase.firestore();
const users = db.collection('users');

export const addStudent = studentId => {
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
  users
    .doc(user.uid)
    .set(Student.toJson(user.uid, profile))
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
      dispatch(createUser(user.user, profile));
      dispatch(signInUser(email, password));
    })
    .catch(error => {
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
  firebase
    .auth()
    .signOut()
    .then(() => {
      return dispatch({ type: LOG_OUT_USER });
    });
};
