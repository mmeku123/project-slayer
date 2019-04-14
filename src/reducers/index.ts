import { combineReducers } from 'redux';
import projects from './projects';
import subjects from './subjects';
import auth from './auth';
import members from './members';
import tasks from './tasks';

const rootReducer = combineReducers({
  projects,
  subjects,
  auth,
  members,
  tasks
});

export default rootReducer;
