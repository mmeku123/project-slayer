import { ADD_SUBJECT, CHANGE_SUBJECT } from '../actions/types';
import subjectData from '../mocks/subjects';
import Subject from '../models/Subject';
import { simpleProjects } from '../mocks/projects';

function newSubject(subjectName: string) {
  let subject = new Subject(subjectName, subjectName);
  subject.projects = simpleProjects;

  return subject;
}

const initialState = {
  subjects: subjectData,
  focusSubject: subjectData[0],
  isFocusSubject: false
};

export default function subjects(state = initialState, action) {
  switch (action.type) {
    case ADD_SUBJECT:
      let subject = newSubject(action.subjectName);
      return {
        ...state,
        subjects: [...state.subjects, subject]
      };
    case CHANGE_SUBJECT:
      return {
        ...state,
        focusSubject: state.subjects.find(subject => {
          return subject.name == action.subjectName;
        }),
        isFocusSubject: true
      };
    default:
      return state;
  }
}
