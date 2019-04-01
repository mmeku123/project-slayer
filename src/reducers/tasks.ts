import { FETCH_TASKS, ADD_TASK, EDIT_TASK } from '../actions/types';
import { Comment } from '../models';

const initialState = {
  byTime: []
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      const { newTask } = action.payload;
      console.log(newTask);
      return {
        ...state,
        byTime: [...state.byTime, newTask]
      };

    case EDIT_TASK:
      const { name, isDone, detail, priority, comments } = action.payload.data;

      return {
        ...state,
        byTime: state.byTime.map(task => {
          if (task._id == action.payload.id) {
            task.name = name;
            task.isDone = isDone;
            task.detail = detail;
            task.priority = priority;
            task.comments = comments.map(comment => {
              return Comment.fromMap(comment);
            });
            return task;
          }
          return task;
        })
      };

    case FETCH_TASKS:
      const { tasksByTime } = action.payload;
      if (tasksByTime && tasksByTime != [])
        return { ...state, byTime: [...tasksByTime] };
    default:
      return state;
  }
}
