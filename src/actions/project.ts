import {
  LOAD_PROJECT,
  ADD_PROJECT_SUBJECT,
  UPDATE_PROJECT,
  FETCH_PROJECTS,
  CHANGE_PROJECT,
  EDIT_PROJECT,
  ADD_PROJECT_SUCCESS,
  FETCH_PROJECT_MEMBERS,
  TOGGLE_SHOW_PROJECT
} from './types';

import Project, { ProjectSprint } from '../models/Project';

import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
  showWarningNotification
} from './actor';

// import axios from 'axios';
import firebase from '../firebase';
import { Student } from '../models';
import EditType from '../constant/editType';

const db = firebase.firestore();
const projects = db.collection('projects');
const subjects = db.collection('subjects');
const users = db.collection('users');

const authId = localStorage.getItem('auth_id');

export const updateProjectImage = (
  project: Project,
  subjectId,
  imagePath
) => async dispatch => {
  dispatch(showLoadingNotification('Updating...'));

  projects
    .doc(project._id)
    .update({ img: imagePath })
    .then(() => {
      subjects
        .doc(subjectId)
        .get()
        .then(doc => {
          const projects = doc.data().projectIds;

          dispatch(fetchProjectByIds(projects));
          dispatch(showSuccessNotification('Update success'));
        });
    });
};

export const createProject = (
  projectName: string,
  subjectId: string
) => async dispatch => {
  dispatch(showLoadingNotification('Creating...'));

  projects
    .add(Project.toJson(projectName, authId))
    .then(doc => {
      dispatch({
        type: ADD_PROJECT_SUCCESS,
        payload: { id: doc.id, name: projectName, studentId: authId }
      });
      dispatch(addProjectToSubject(doc.id, subjectId));
      dispatch(showSuccessNotification('Create success'));
    })
    .catch(error => dispatch(showErrorNotification(error.message)));
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

export const fetchProjectByIds = (projectIds: string[]) => async dispatch => {
  dispatch(showLoadingNotification('Loading...'));

  const userProjects: Project[] = [];

  if (projectIds.length == 0) {
    return dispatch({ type: FETCH_PROJECTS, payload: { projects: [] } });
  } else {
    projectIds.forEach(projectId => {
      projects
        .doc(projectId)
        .get()
        .then(doc => {
          const isStudentProject = doc
            .data()
            .studentIds.find(studentId => studentId == authId)
            ? true
            : false;

          const project = Project.fromMap(doc.id, doc.data());
          project.schedule.sprints = project.schedule.sprints.map(
            (sprint: ProjectSprint) => {
              return new ProjectSprint(
                sprint._id,
                sprint.name,
                sprint.detail,
                sprint.dueDate,
                sprint.img
              );
            }
          );

          if (isStudentProject) userProjects.push(project);

          return dispatch({
            type: FETCH_PROJECTS,
            payload: { projects: userProjects }
          });
        })
        .catch(error => dispatch(showErrorNotification(error.message)));
    });
  }
};

export const updateProject = (projectId: string) => async dispatch => {
  dispatch(showLoadingNotification('Loading...'));

  projects
    .doc(projectId)
    .get()
    .then(doc => {
      const project = Project.fromMap(doc.id, doc.data());

      dispatch({ type: UPDATE_PROJECT, payload: { project } });
      dispatch(showSuccessNotification('Success'));
    })
    .catch(error => dispatch(showErrorNotification(error.message)));
};

export const changeProject = projectId => async dispatch => {
  dispatch({ type: TOGGLE_SHOW_PROJECT });
  return dispatch({ type: CHANGE_PROJECT, projectId });
};

export const editProject = (
  projectId,
  editType: EditType,
  value
) => async dispatch => {
  dispatch(showLoadingNotification('Updating...'));

  let editData = {};

  switch (editType) {
    case EditType.DETAIL:
      editData = { detail: value };
  }

  projects
    .doc(projectId)
    .update(editData)
    .then(() => {
      dispatch(updateProject(projectId));
      dispatch(showSuccessNotification('Success'));
    })
    .catch(error => dispatch(showErrorNotification(error.message)));
};

export const addSprint = (
  projectId: string,
  editType: EditType,
  sprintDetail
) => async dispatch => {
  const { name, detail, dueDate, img } = sprintDetail;

  projects
    .doc(projectId)
    .get()
    .then(doc => {
      const projectSprints = doc.data().schedule.sprints;
      const projectSchedule = doc.data().schedule;
      const sprintNo = doc.data().schedule.sprints.length;
      const sprintId = sprintNo ? projectSprints[sprintNo - 1]._id + 1 : 0;

      projects
        .doc(projectId)
        .update({
          schedule: {
            ...projectSchedule,
            sprints: [
              ...projectSprints,
              { _id: sprintId, name, detail, dueDate, img }
            ]
          }
        })
        .then(() => {
          dispatch(updateProject(projectId));
        })
        .catch(error => dispatch(showErrorNotification(error.message)));
    });
};

export const deleteSprint = (
  projectId: string,
  sprintId: string
) => async dispatch => {
  dispatch(showLoadingNotification('Deleting Sprint...'));

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
          dispatch(updateProject(projectId));
          dispatch(showSuccessNotification('Success'));
        })
        .catch(error => dispatch(showErrorNotification(error.message)));
    });
};

export const deleteProject = (
  projectId: string,
  subjectId
) => async dispatch => {
  dispatch(showLoadingNotification('Deleting Project...'));

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
        .then(() => dispatch(fetchProjectByIds(remainedProjects)))
        .catch(error => dispatch(showErrorNotification(error.message)));

      projects
        .doc(projectId)
        .delete()
        .then(() => dispatch(showSuccessNotification('Success')))
        .catch(error => dispatch(showErrorNotification(error.message)));
    });
};

export const addProjectMember = (projectId, memberEmail) => async dispatch => {
  dispatch(showLoadingNotification('Adding Member...'));

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

            if (!isDuplicate) {
              projects
                .doc(projectId)
                .update({ studentIds: [...projectMembers, member.id] })
                .then(() => {
                  dispatch(fetchProjectMembers(projectId));
                  dispatch(showSuccessNotification('Success'));
                })
                .catch(error => dispatch(showErrorNotification(error.message)));
            } else {
              dispatch(showWarningNotification('member duplicated'));
            }
          } else {
            dispatch(
              showWarningNotification('member with this email not found')
            );
          }
        });
    });
};

export const fetchProjectMembers = projectId => async dispatch => {
  const members = [];

  dispatch(showLoadingNotification('Loading...'));

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
            dispatch({
              type: FETCH_PROJECT_MEMBERS,
              payload: members
            });
            dispatch(showSuccessNotification('Success'));
          })
          .catch(error => dispatch(showErrorNotification(error.message)));
      });
    });
};
