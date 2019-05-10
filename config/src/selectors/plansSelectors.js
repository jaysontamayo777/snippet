/**
 * Extract plans from product list.
 * @param {array} products - list of products
 * @returns list of plans
 */
export const getPlanList = (products = []) => {
  let plans = [];
  Array.isArray(products) &&
    products.forEach(product => {
      const plansWithProdId = product.plans.map(p => {
        return Object.assign({}, p, {
          productId: product.productId
        });
      });

      plans = [...plans, ...plansWithProdId];
    });

  return plans;
};

/**
 * Get selected plan from the list of plans.
 * @param {array} plans - list of plans
 * @returns selected plan
 */
export const getSelectedPlan = (plans = []) => {
  const planList = Object.assign([], plans);
  const selectedPlan = planList.filter(plan => plan.selected)[0];
  return selectedPlan || {};
};

/**
 * Get selected addOns from the selected plan.
 * @param {object} plan - selected plan
 * @returns selected add-ons
 */
export const getSelectedAddOns = (plan = {}) => {
  const { addOns } = plan;
  const selectedAddons =
    Array.isArray(addOns) && addOns.filter(addOn => addOn.selected);
  return selectedAddons || [];
};
