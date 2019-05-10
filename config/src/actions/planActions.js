import * as types from '../constants/actionTypes';
import { getQuote } from './quoteActions';
import objectAssign from 'object-assign';
import _ from 'lodash';

// initially load plans to state
export const loadPlansSuccess = plans => {
  return { type: types.LOAD_PLANS, payload: plans };
};

// action after a plan was selected from plans
export const selectedPlanSuccess = plans => {
  return { type: types.PLAN_SELECTED, payload: plans };
};

// Triggers reducer to save plan details when selecting an addon
export const selectedAddOnSuccess = plan => {
  return { type: types.ADDON_SELECTED, payload: plan };
};

export const initPlans = () => {
  return dispatch => dispatch(loadPlansSuccess([]));
};

export const initSelectedPlans = () => {
  return dispatch => dispatch({
    type: types.INIT_PLAN_SELECTED,
    payload: {
      productId: '',
      planId: ''
    }
  });
};

/**
 * Toggle select plan
 *
 * Plans will be unselected by default,
 * Will look for the selected planId on plans
 * and set that plan flag selected to true.
 * Then dispatch the updated plans.
 *
 * @param {array} plans
 * @param {object} selected plan
 */
export const selectPlan = (plans, plan) => {
  const selectedPlan = objectAssign({}, plan);
  selectedPlan.selected = true;

  const planList = objectAssign([], plans);
  const selectionPlans = planList.map(planItem => {
    const unselectedPlan = objectAssign({}, planItem);
    unselectedPlan.selected = false;
    return planItem.planId === selectedPlan.planId
      ? selectedPlan
      : unselectedPlan;
  });

  return dispatch => dispatch(selectedPlanSuccess(selectionPlans));
};

/**
 * Select or unselect an AddOn and will retrigger the
 * getQuote function to reload new prices based from the input
 * provided.
 *
 * @param {Object} profile
 * Travel details neede for profiling.
 *
 * @param {Object} plan
 * Selected plan object.
 *
 * @param {Object} addOn
 * Selected addOn object
 *
 * @param {string} locale
 * Can be 'en' or 'zh'
 */
export const selectAddOn = (profile, plan, addOn, locale) => {
  const selectedAddOn = objectAssign({}, addOn);
  const selectedPlan = _.cloneDeep(plan);
  const selection = _.cloneDeep(plan);

  selectedAddOn.selected = !selectedAddOn.selected;

  // Get index of the modified addon
  const index = _.findIndex(selectedPlan.addOns, {
    addOnId: selectedAddOn.addOnId
  });
  // Replace the original addon with updated object
  selectedPlan.addOns.splice(index, 1, selectedAddOn);
  // Compose an array of addon IDs
  selection.addOnIds = selectedPlan.addOns
    .filter(addon => addon.selected)
    .map(addon => addon.addOnId);

  return dispatch => {
    dispatch(selectedAddOnSuccess(selectedPlan));
    return getQuote(profile, selection, locale)(dispatch);
  };
};
