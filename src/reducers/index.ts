import { combineReducers } from 'redux';
import projects from './projects';
import subjects from './subjects';
import auth from './auth';
import members from './members';
import tasks from './tasks';
import actor from './actor';

const rootReducer = combineReducers({
  projects,
  subjects,
  auth,
  members,
  tasks,
  actor
});

export default rootReducer;
