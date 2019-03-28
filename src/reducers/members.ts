import { ADD_PROJECT_MEMBER, FETCH_PROJECT_MEMBERS } from '../actions/types';

export default function members(state = [], action) {
  switch (action.type) {
    case FETCH_PROJECT_MEMBERS:
      console.log(action.payload);
      return [...state, ...action.payload];
    case ADD_PROJECT_MEMBER:
      return [...state, action.payload.member];

    default:
      return [];
  }
}
