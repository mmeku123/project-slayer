import { FETCH_TASKS } from './types';

import firebase from '../firebase';
import { Task, Comment } from '../models';
import moment from 'moment';

import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
  showWarningNotification
} from './actor';

const db = firebase.firestore();
const tasks = db.collection('tasks');

export const addTask = (projectId: string, newTask: Task) => async dispatch => {
  dispatch(showLoadingNotification('Adding...'));

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
      dispatch({ type: FETCH_TASKS, payload: { tasksByTime } });
      dispatch(showSuccessNotification('Done'));
    })
    .catch(error => dispatch(showErrorNotification(error.message)));
};

export const voteTask = (
  projectId: string,
  taskId: string,
  voteStatus
) => async dispatch => {
  dispatch(showLoadingNotification('Voting...'));

  const userId = localStorage.getItem('auth_id');

  tasks
    .doc(taskId)
    .get()
    .then(doc => {
      const voted: { votedYes: string[]; votedNo: string[] } = doc.data().vote;
      voted.votedNo = voted.votedNo.filter(vote => vote != userId);
      voted.votedYes = voted.votedYes.filter(vote => vote != userId);
      if (voteStatus == 'YES') voted.votedYes.push(userId);
      else voted.votedNo.push(userId);
      tasks
        .doc(taskId)
        .update({ vote: { votedYes: voted.votedYes, votedNo: voted.votedNo } })
        .then(() => {
          dispatch(fetchTasks(projectId));
        });
    });
};

export const editTask = (
  projectId: string,
  taskId: string,
  editData
) => async dispatch => {
  dispatch(showLoadingNotification('Editing...'));

  switch (editData.type) {
    case 'detail':
      const {
        name,
        isDone,
        detail,
        priority,
        startDate,
        dueDate
      } = editData.editDetail;
      tasks
        .doc(taskId)
        .update({ name, isDone, detail, priority, startDate, dueDate })
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
          const commentLength = doc.data().comments.length;
          const commentId = commentLength == 0 ? 0 : commentLength;

          tasks
            .doc(taskId)
            .update({
              comments: [
                ...existedComments,
                Comment.toJson(
                  commentId.toString(),
                  localStorage.getItem('auth_id'),
                  localStorage.getItem('auth_email'),
                  moment().format('MM/DD/YYYY'),
                  newComment
                )
              ]
            })
            .then(() => {
              return dispatch(fetchTasks(projectId));
            });
        });
      break;
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
