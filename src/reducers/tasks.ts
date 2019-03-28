import { FETCH_TASKS, ADD_TASK } from '../actions/types';

const initialState = {
  byMember: [],
  byTime: []
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      const { newTask } = action.payload;
      console.log(newTask);
      return {
        ...state,
        byMember: [...state.byMember, newTask],
        byTime: [...state.byTime, newTask]
      };
    case FETCH_TASKS:
      const { tasksByMember, tasksByTime } = action.payload;
      if (tasksByMember && tasksByMember != [])
        return { ...state, byMember: [...tasksByMember] };
      if (tasksByTime && tasksByTime != [])
        return { ...state, byTime: [...tasksByTime] };
    default:
      return state;
  }
}
