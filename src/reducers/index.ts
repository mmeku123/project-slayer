import { combineReducers } from 'redux';
import projects from './projects';
import subjects from './subjects';

const rootReducer = combineReducers({
  projects,
  subjects
});

export default rootReducer;
