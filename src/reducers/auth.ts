import { AUTH_USER, LOG_OUT_USER } from '../actions/types';

export default function auth(
  state = {
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
    default:
      return state;
  }
}
