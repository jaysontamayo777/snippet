import { INITIAL_STATE } from '../constants/actionTypes';

export const resetStates = () => dispatch => {
  dispatch({ type: INITIAL_STATE });
};
