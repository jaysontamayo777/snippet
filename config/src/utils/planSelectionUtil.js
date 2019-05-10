/**
 * Contructs and object that contains the details of the
 * selected plan and addons. Will replace 'addOns' with
 * addOnIds field.
 *
 * @param {Object} plan
 * Selected plan that contains addOns
 */
export function getSelectionData(plan) {
  const selectedPlan = Object.assign({}, plan);
  // let selectedAddons = [];

  // if (selectedPlan.addOns && selectedPlan.addOns.length > 0) {
  //   selectedAddons = selectedPlan.addOns
  //     .filter(addOn => addOn.selected)
  //     .map(addOn => addOn.addOnId);
  // }

  // delete selectedPlan.addOns;
  
  // selectedPlan.addOnIds = selectedAddons;
  return selectedPlan;
}

export function getPlanIds(plans = []) {
  return plans.map(plan => plan.planId);
}
