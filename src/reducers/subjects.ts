import {
  ADD_SUBJECT,
  CHANGE_SUBJECT,
  FETCH_SUBJECT,
  ADD_PROJECT_SUBJECT
} from '../actions/types';
import Subject from '../models/Subject';

function newSubject(subjectName: string) {
  let subject = new Subject(subjectName, subjectName);
  return subject;
}

const initialState = {
  subjects: [],
  focusSubject: null,
  isFocusSubject: false
};

export default function subjects(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUBJECT:
      return { ...state, subjects: action.payload };
    case ADD_SUBJECT:
      const { id, name } = action.payload;
      let subject = new Subject(id, name);
      // ! : Fix this
      return {
        ...state,
        subjects: [...state.subjects, subject]
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
