import {
  LOAD_SUBJECT,
  CHANGE_SUBJECT,
  FETCH_SUBJECT,
  ADD_SUBJECT_SUCCESS,
  ADD_PROJECT_SUBJECT
} from '../actions/types';

import projects from './projects';
import Subject from '../models/Subject';

function newSubject(subjectName: string) {
  let subject = new Subject(subjectName, subjectName);
  return subject;
}

const initialState = {
  subjects: [],
  focusSubject: null,
  isFocusSubject: false,
  isLoading: false
};

export default function subjects(state = initialState, action) {
  switch (action.type) {
    case LOAD_SUBJECT:
      return { ...state, isLoading: true };
    case FETCH_SUBJECT:
      return {
        ...state,
        isLoading: false,
        isFocusSubject: false,
        subjects: action.payload
      };
    case ADD_SUBJECT_SUCCESS:
      const { id, name, studentId } = action.payload;
      let subject = new Subject(id, name);
      subject.studentIds = [studentId];
      return {
        ...state,
        isLoading: false,
        subjects: [...state.subjects, subject]
      };
    case ADD_PROJECT_SUBJECT:
      const { subjectId, projectId } = action.payload;
      return {
        ...state,
        subjects: state.subjects.map(subject => {
          if (subject._id == subjectId) {
            subject.projectIds = [...subject.projectIds, projectId];
            return subject;
          } else {
            return subject;
          }
        }),
        focusSubject: state.subjects.map(subject => {
          if (subject._id == subjectId) {
            subject.projectIds = [...subject.projectIds, projectId];
            return subject;
          }
        })
      };
    case CHANGE_SUBJECT:
      return {
        ...state,
        focusSubject: state.subjects.find(subject => {
          return subject._id == action.subjectId;
        }),
        isFocusSubject: true
      };
    default:
      return state;
  }
}
