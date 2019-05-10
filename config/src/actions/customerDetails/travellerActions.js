import {
  TRAVELLER_FORM_INIT,
  TRAVELLER_FORM_UPDATE_FIELDS,
  TRAVELLER_FORM_IS_POLICY_HOLDER,
  TRAVELLER_OPEN
} from '../../constants/actionTypes';

export const initializeTravellerForms = (numberOfAdults, numberOfChildren) => ({
  type: TRAVELLER_FORM_INIT,
  payload: { numberOfAdults, numberOfChildren }
});

export const updateTravellerFields = (travellerIndex, formFields, errors) => ({
  type: TRAVELLER_FORM_UPDATE_FIELDS,
  payload: { travellerIndex, formFields, errors }
});

export const setTravellerAsPolicyHolder = (travIndex, isPolicyHolder) => ({
  type: TRAVELLER_FORM_IS_POLICY_HOLDER,
  payload: { travIndex, isPolicyHolder }
});

export const openForm = formIndex => ({
  type: TRAVELLER_OPEN,
  payload: { formIndex }
});
