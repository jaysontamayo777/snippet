import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function plansReducer(state = initialState.plans, action) {
  switch (action.type) {
    /**
     * Load plans retrieved from Quotation module.
     * No modification needed.
     *
     * @param {Array} action.payload
     * List of plans from quote and will be loaded to 'plans'.
     */
    case types.LOAD_PLANS:
      return objectAssign([], action.payload);

    /**
     * @payload {array} updated plans
     */
    case types.PLAN_SELECTED:
      return objectAssign([], state, action.payload);

    /**
     * @payload {object} updated plan
     */
    case types.ADDON_SELECTED:
      const selectionPlan = action.payload;
      const selectionPlans = objectAssign([], state);
      const plans = selectionPlans.map(plan => {
        return plan.planId === selectionPlan.planId ? selectionPlan : plan;
      });

      return objectAssign([], state, plans);

    default:
      return state;
  }
}
