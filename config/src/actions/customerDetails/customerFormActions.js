import * as types from '../../constants/actionTypes';

export const goToNextForm = () => ({
  type: types.GO_TO_NEXT_FORM
});

export const goToSelectedForm = (selectedFormIndex) => ({
  type: types.GO_TO_SELECTED_FORM,
  payload: { selectedFormIndex }
});
