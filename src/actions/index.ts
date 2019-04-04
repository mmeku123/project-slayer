import {
  ADD_PROJECT,
  ADD_SUBJECT_SUCCESS,
  ADD_PROJECT_SUBJECT,
  UPDATE_PROJECT,
  FETCH_PROJECTS,
  ADD_SUBJECT,
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
import { EditType } from '../constant/editType';

const db = firebase.firestore();
const projects = db.collection('projects');
const subjects = db.collection('subjects');
const users = db.collection('users');
const tasks = db.collection('tasks');

const authId = localStorage.getItem('auth_id');

export const createProject = (
  projectName: string,
  subjectId: string
) => async dispatch => {
  dispatch({ type: ADD_PROJECT, payload: null });

  const req = await projects.add(Project.toJson(projectName, authId));

  dispatch({
    type: ADD_PROJECT_SUCCESS,
    payload: { id: req.id, name: projectName, studentId: authId }
  });
  return dispatch(addProjectToSubject(req.id, subjectId));
};

export const addProjectToSubject = (
  projectId: string,
  subjectId: string
) => async dispatch => {
  const req = await subjects.doc(subjectId);
  const doc = await req.get();
  const projectIds = await doc.data().projectIds;
  await req.update({ projectIds: [...projectIds, projectId] });

  return dispatch({
    type: ADD_PROJECT_SUBJECT,
    payload: { projectId, subjectId }
  });
};

export const updateProject = (projectId: string) => async dispatch => {
  projects
    .doc(projectId)
    .get()
    .then(doc => {
      const project = Project.fromMap(doc.id, doc.data());

      return dispatch({ type: UPDATE_PROJECT, payload: { project } });
    });
};

export const fetchProjectByIds = (projectIds: string[]) => async dispatch => {
  const req = await projects.get();

  const projectList = [];

  const resProjects = req.docs.forEach(doc => {
    if (projectIds) {
      if (projectIds.find(id => id == doc.id)) {
        const project = Project.fromMap(doc.id, doc.data());
        project.schedule.sprints = project.schedule.sprints.map(
          (sprint: ProjectSprint) => {
            return new ProjectSprint(
              sprint._id,
              sprint.name,
              sprint.detail,
              sprint.dueDate
            );
          }
        );
        projectList.push(project);
      }
    }
  });

  return dispatch({ type: FETCH_PROJECTS, payload: { projects: projectList } });
};

export const fetchSubject = () => async dispatch => {
  const req = await subjects.get();
  const res = req.docs.map(doc => Subject.fromMap(doc.id, doc.data()));

  return dispatch({ type: FETCH_SUBJECT, payload: res });
};

export const createSubject = subjectName => async dispatch => {
  dispatch({ type: ADD_SUBJECT });

  const req = subjects.add(Subject.toJson(subjectName, authId)).then(ref => {
    return dispatch({
      type: ADD_SUBJECT_SUCCESS,
      payload: { id: ref.id, name: subjectName, studentId: authId }
    });
  });
};

export const fetchProjectMembers = projectId => async dispatch => {
  const members = [];

  projects
    .doc(projectId)
    .get()
    .then(doc => {
      doc.data().studentIds.forEach(studentId => {
        users
          .doc(studentId)
          .get()
          .then(doc => {
            members.push(Student.fromMap(doc.id, doc.data()));
          })
          .then(() => {
            return dispatch({
              type: FETCH_PROJECT_MEMBERS,
              payload: members
            });
          });
      });
    });
};

export const changeSubject = subjectId => async dispatch => {
  dispatch({ type: TOGGLE_SHOW_PROJECT });
  return dispatch({ type: CHANGE_SUBJECT, subjectId });
};

export const changeProject = projectId => async dispatch => {
  dispatch({ type: TOGGLE_SHOW_PROJECT });
  return dispatch({ type: CHANGE_PROJECT, projectId });
};

export const changeProjectBySubject = subject => {
  return { type: CHANGE_PROJECT_SUBJECT, subject };
};

export const createStudent = () => {
  return { type: CREATE_STUDENT };
};

export const authStudent = () => async dispatch => {
  const studentId = '2dEeCuhsAft4cRkFa5px';

  localStorage.setItem('auth_id', studentId);

  return dispatch({ type: AUTH_USER });
};

export const addStudent = studentId => {
  users
    .doc(studentId)
    .get()
    .then(doc => {
      const { id, name, nickname, email, phone, job } = doc.data();
      const member = new Student(doc.id, id, name, nickname, email, phone, job);
      return { type: ADD_PROJECT_MEMBER, payload: member };
    });
};

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
        console.log(doc.data());
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

export const editProject = (
  projectId,
  editType: EditType,
  value
) => async dispatch => {
  dispatch({ type: EDIT_PROJECT });
  let editData = {};
  let editResult = {};

  switch (editType) {
    case EditType.DETAIL:
      editData = { detail: value };
  }

  projects
    .doc(projectId)
    .update(editData)
    .then(() => {
      return dispatch(updateProject(projectId));
    });
};

export const addSprint = (
  projectId: string,
  editType: EditType,
  sprintDetail
) => async dispatch => {
  dispatch({ type: EDIT_PROJECT });

  const { _id, name, detail, dueDate } = sprintDetail;
  projects
    .doc(projectId)
    .get()
    .then(doc => {
      const projectSprints = doc.data().schedule.sprints;
      const projectSchedule = doc.data().schedule;
      const sprintId = doc.data().schedule.sprints.length++;
      projects
        .doc(projectId)
        .update({
          schedule: {
            ...projectSchedule,
            sprints: [
              ...projectSprints,
              { _id: sprintId, name, detail, dueDate }
            ]
          }
        })
        .then(() => {
          return dispatch(updateProject(projectId));
        });
    });
};

export const deleteSprint = (
  projectId: string,
  sprintId: string
) => async dispatch => {
  projects
    .doc(projectId)
    .get()
    .then(doc => {
      const remainedSprints = [];
      const projectSchedule = doc.data().schedule;

      doc.data().schedule.sprints.forEach(sprint => {
        if (sprint._id != sprintId) remainedSprints.push(sprint);
      });

      projects
        .doc(projectId)
        .update({
          schedule: {
            ...projectSchedule,
            sprints: remainedSprints
          }
        })
        .then(() => {
          return dispatch(updateProject(projectId));
        });
    });
};

export const deleteProject = (
  projectId: string,
  subjectId
) => async dispatch => {
  subjects
    .doc(subjectId)
    .get()
    .then(doc => {
      const subjectProjects = doc.data().projectIds;
      const remainedProjects = [];

      subjectProjects.forEach(project => {
        if (project == projectId) remainedProjects.push(project);
      });

      subjects
        .doc(subjectId)
        .update({ projectIds: remainedProjects })
        .then(() => dispatch(fetchProjectByIds(remainedProjects)));

      projects.doc(projectId).delete();
    });
};

export const deleteSubject = (subjectId: string) => async dispatch => {
  subjects
    .doc(subjectId)
    .delete()
    .then(() => dispatch(fetchSubject()));
};

const createUser = (user: firebase.User) => async dispatch => {
  users
    .doc(user.uid)
    .set(Student.toJson(user.uid, user.email))
    .then(() => dispatch(fetchUser(user.uid)));
};

const fetchUser = (userId: string) => async dispatch => {
  users
    .doc(userId)
    .get()
    .then(doc => {
      const user = Student.fromMap(doc.id, doc.data());

      return dispatch({ type: FETCH_USER, payload: { user } });
    });
};

export const signUpUser = (
  email: string,
  password: string
) => async dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(createUser(user.user));
      dispatch(signInUser(email, password));
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const signInUser = (
  email: string,
  password: string
) => async dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      let user = firebase.auth().currentUser;

      if (user) {
        localStorage.setItem('auth_id', user.uid);
        localStorage.setItem('auth_email', email);
        localStorage.setItem('auth_password', password);
        return dispatch({ type: AUTH_USER, payload: { userId: user.uid } });
      }
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const autoAuth = () => async dispatch => {
  const email = localStorage.getItem('auth_email');
  const password = localStorage.getItem('auth_password');

  if (email && password) {
    return dispatch(signInUser(email, password));
  }
};

export const logOutUser = () => async dispatch => {
  localStorage.removeItem('auth_id');
  localStorage.removeItem('auth_email');
  localStorage.removeItem('auth_password');

  firebase
    .auth()
    .signOut()
    .then(() => {
      return dispatch({ type: LOG_OUT_USER });
    });
};

export const addProjectMember = (projectId, memberEmail) => async dispatch => {
  projects
    .doc(projectId)
    .get()
    .then(doc => {
      const projectMembers: [] = doc.data().studentIds;

      users
        .where('email', '==', memberEmail)
        .get()
        .then(query => {
          if (query.docs.length == 1) {
            const member = query.docs[0];

            const isDuplicate: boolean = projectMembers.find(
              projectMember => projectMember == member.id
            )
              ? true
              : false;

            if (!isDuplicate)
              projects
                .doc(projectId)
                .update({ studentIds: [...projectMembers, member.id] })
                .then(() => dispatch(fetchProjectMembers(projectId)));
            else {
              console.log('member duplicate');
            }
          } else {
            console.log('error with the email');
          }
        });
    });
};
