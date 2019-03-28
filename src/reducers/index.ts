import { combineReducers } from 'redux';
import projects from './projects';
import subjects from './subjects';
import auth from './auth';
import members from './members';

const rootReducer = combineReducers({
  projects,
  subjects,
  auth,
  members
});

export default rootReducer;
