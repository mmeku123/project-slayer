import { AUTH_USER, LOG_OUT_USER, FETCH_USER } from '../actions/types';

export default function auth(
  state = {
    user: null,
    isAuth: false,
    authId: ''
  },
  action
) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuth: true, authId: action.payload.userId };
    case LOG_OUT_USER:
      return { ...state, isAuth: false, authId: '' };

    case FETCH_USER:
      return { ...state, user: action.payload.user };

    default:
      return state;
  }
}
