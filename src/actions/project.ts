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

// import axios from 'axios';
import firebase from '../firebase';
import { Student } from '../models';
import EditType from '../constant/editType';

const db = firebase.firestore();
const projects = db.collection('projects');
const subjects = db.collection('subjects');
const users = db.collection('users');

const authId = localStorage.getItem('auth_id');

export const createProject = (
  projectName: string,
  subjectId: string
) => async dispatch => {
  dispatch({ type: LOAD_PROJECT });

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
  dispatch({ type: LOAD_PROJECT });

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
  dispatch({ type: LOAD_PROJECT });

  const userProjects: Project[] = [];

  if (projectIds.length == 0) {
    return dispatch({ type: FETCH_PROJECTS, payload: { projects: [] } });
  } else {
    const res = projectIds.forEach(projectId => {
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
                sprint.dueDate
              );
            }
          );

          if (isStudentProject) userProjects.push(project);

          return dispatch({
            type: FETCH_PROJECTS,
            payload: { projects: userProjects }
          });
        });
    });
  }
};

export const updateProject = (projectId: string) => async dispatch => {
  dispatch({ type: LOAD_PROJECT });

  projects
    .doc(projectId)
    .get()
    .then(doc => {
      const project = Project.fromMap(doc.id, doc.data());

      return dispatch({ type: UPDATE_PROJECT, payload: { project } });
    });
};

export const changeProject = projectId => async dispatch => {
  dispatch({ type: LOAD_PROJECT });

  dispatch({ type: TOGGLE_SHOW_PROJECT });
  return dispatch({ type: CHANGE_PROJECT, projectId });
};

export const editProject = (
  projectId,
  editType: EditType,
  value
) => async dispatch => {
  dispatch({ type: LOAD_PROJECT });

  let editData = {};

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
  dispatch({ type: LOAD_PROJECT });

  const { name, detail, dueDate } = sprintDetail;

  console.log(sprintDetail);

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
              { _id: sprintId, name, detail, dueDate: dueDate }
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
  dispatch({ type: LOAD_PROJECT });

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
  dispatch({ type: LOAD_PROJECT });

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

export const addProjectMember = (projectId, memberEmail) => async dispatch => {
  dispatch({ type: LOAD_PROJECT });

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
                .then(() => dispatch(fetchProjectMembers(projectId)));
            } else {
              console.log('member duplicate');
            }
          } else {
            console.log('error with the email');
          }
        });
    });
};

export const fetchProjectMembers = projectId => async dispatch => {
  const members = [];
  dispatch({ type: LOAD_PROJECT });

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
