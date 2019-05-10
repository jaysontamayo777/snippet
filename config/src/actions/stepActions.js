import { SET_STARTUP_PAGE, SET_PROGRESS, SET_CURRENT_STEP } from '../constants/actionTypes';

export const setStartupPage = isAltPage => dispatch => {
  dispatch({
    type: SET_STARTUP_PAGE,
    payload: isAltPage
  });
};

export const setProgress = progress => dispatch => {
  dispatch({
    type: SET_PROGRESS,
    payload: progress
  });
};

export const setCurrentStep = step => dispatch => {
  dispatch({
    type: SET_CURRENT_STEP,
    payload: step
  });
}
