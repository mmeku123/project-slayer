import { SHOW_INDICATOR } from './types';

export const showLoadingNotification = message => async dispatch => {
  return dispatch({
    type: SHOW_INDICATOR,
    payload: { type: 'LOADING', message }
  });
};

export const showNotification = message => async dispatch => {
  return dispatch({
    type: SHOW_INDICATOR,
    payload: { type: 'NORMAL', message }
  });
};

export const showSuccessNotification = message => async dispatch => {
  return dispatch({
    type: SHOW_INDICATOR,
    payload: { type: 'SUCCESS', message }
  });
};

export const showWarningNotification = message => async dispatch => {
  return dispatch({
    type: SHOW_INDICATOR,
    payload: { type: 'WARNING', message }
  });
};

export const showErrorNotification = message => async dispatch => {
  return dispatch({
    type: SHOW_INDICATOR,
    payload: { type: 'ERROR', message }
  });
};
