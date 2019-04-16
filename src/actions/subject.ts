import {
  LOAD_SUBJECT,
  CHANGE_SUBJECT,
  FETCH_SUBJECT,
  TOGGLE_SHOW_PROJECT
} from './types';

import firebase from '../firebase';
import { Subject } from '../models';

const db = firebase.firestore();
const subjects = db.collection('subjects');
const users = db.collection('users');

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
