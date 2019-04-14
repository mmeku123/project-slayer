import {
  ADD_PROJECT,
  ADD_SUBJECT_SUCCESS,
  ADD_PROJECT_SUBJECT,
  UPDATE_PROJECT,
  FETCH_PROJECTS,
  LOAD_SUBJECT,
  CHANGE_SUBJECT,
  CHANGE_PROJECT_SUBJECT,
  CHANGE_PROJECT,
  EDIT_PROJECT,
  FETCH_SUBJECT,
  ADD_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  ADD_STUDENT,
  CREATE_STUDENT,
  AUTH_USER,
  ADD_PROJECT_MEMBER,
  FETCH_PROJECT_MEMBERS,
  TOGGLE_SHOW_PROJECT,
  FETCH_TASKS,
  ADD_TASK,
  EDIT_TASK,
  LOG_OUT_USER,
  FETCH_USER
} from './types';

import Project, { ProjectSprint, ProjectSchedule } from '../models/Project';

import axios from 'axios';
import firebase from '../firebase';
import { Subject, Student, Task, Comment } from '../models';
import EditType from '../constant/editType';

const db = firebase.firestore();
const projects = db.collection('projects');
const subjects = db.collection('subjects');
const users = db.collection('users');
const tasks = db.collection('tasks');

const authId = localStorage.getItem('auth_id');

export const addTask = (projectId: string, newTask: Task) => async dispatch => {
  tasks.add(Task.toJson(projectId, newTask)).then(ref => {
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
