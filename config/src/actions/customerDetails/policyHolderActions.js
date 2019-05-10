import { POLICY_HOLDER_FORM_UPDATE_FIELDS } from '../../constants/actionTypes';

export const updatePolicyHolderFields = (formFields, errors) => ({
  type: POLICY_HOLDER_FORM_UPDATE_FIELDS,
  payload: {
    formFields,
    errors
  }
});
