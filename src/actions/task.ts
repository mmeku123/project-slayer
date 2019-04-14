import { FETCH_TASKS } from './types';

import firebase from '../firebase';
import { Task, Comment } from '../models';

const db = firebase.firestore();
const tasks = db.collection('tasks');

export const addTask = (projectId: string, newTask: Task) => async dispatch => {
  tasks.add(Task.toJson(projectId, newTask)).then(() => {
    return dispatch(fetchTasks(projectId));
  });
};

export const fetchTasks = (projectId: string) => async dispatch => {
  const tasksByProject = await tasks.where('projectId', '==', projectId);
  tasksByProject
    .orderBy('startDate')
    .get()
    .then(query => {
      const tasksByTime = query.docs.map(doc => {
        const task = Task.fromMap(doc.id, doc.data());
        task.comments = task.comments.map(comment => {
          return Comment.fromMap(comment);
        });
        return task;
      });
      return dispatch({ type: FETCH_TASKS, payload: { tasksByTime } });
    });
};

export const editTask = (
  projectId: string,
  taskId: string,
  editData
) => async dispatch => {
  switch (editData.type) {
    case 'detail':
      const { name, isDone, detail, priority } = editData.editDetail;
      tasks
        .doc(taskId)
        .update({ name, isDone, detail, priority })
        .then(() => {
          return dispatch(fetchTasks(projectId));
        });
      break;
    case 'add_comment':
      const { newComment } = editData;
      tasks
        .doc(taskId)
        .get()
        .then(doc => {
          const existedComments = doc.data().comments;
          const commentId = doc.data().comments.length++;
          tasks
            .doc(taskId)
            .update({
              comments: [
                ...existedComments,
                Comment.toJson(
                  commentId.toString(),
                  localStorage.getItem('auth_id'),
                  new Date(),
                  newComment
                )
              ]
            })
            .then(() => {
              return dispatch(fetchTasks(projectId));
            });
        });
    case 'delete_comment':
      const { commentId } = editData;
      tasks
        .doc(taskId)
        .get()
        .then(doc => {
          const remainedComments = [];

          doc.data().comments.forEach(comment => {
            if (comment._id != commentId) remainedComments.push(comment);
          });

          tasks
            .doc(taskId)
            .update({ comments: remainedComments })
            .then(() => dispatch(fetchTasks(projectId)));
        });
      break;
  }
};
