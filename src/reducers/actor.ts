import { SHOW_INDICATOR } from '../actions/types';
import { Actor } from '../models';

const actorState: Actor = {
  notification: {
    isShow: false,
    type: '',
    message: ''
  }
};

export default function auth(state = actorState, action) {
  switch (action.type) {
    case SHOW_INDICATOR:
      const payload = action.payload;

      return {
        ...state,
        notification: {
          isShow: true,
          type: payload.type,
          message: payload.message
        }
      };
      break;
    default:
      return state;
      break;
  }
}
