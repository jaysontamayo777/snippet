import { expect } from 'chai';
import * as plansSelectors from './plansSelectors';

describe('Plan Selectors', () => {
  describe('getPlanList', () => {
    it('should get the last of plans from products', () => {
      const quote = {
        products: [
          {
            productId: 'P-101',
            productName: 'Smart Traveller',
            currency: 'PHP',
            addtionalFee: '100.00',
            plans: [
              {
                planId: 'P-101',
                planName: 'Basic',
                fee: '1000.00',
                addOns: [
                  {
                    addOnId: 'A-101',
                    addOnName: 'Golf Equipment',
                    fee: '20.00'
                  }
                ]
              },
              {
                planId: 'P-201',
                planName: 'Comprehensive',
                fee: '2000.00',
                addOns: [
                  {
                    addOnId: 'A-101',
                    addOnName: 'Some Add On',
                    fee: '20.00'
                  }
                ]
              }
            ]
          },
          {
            productId: 'P-101',
            productName: 'Test Traveller',
            currency: 'PHP',
            addtionalFee: '100.00',
            plans: [
              {
                planId: 'P-112',
                planName: 'Other',
                fee: '1000.00',
                addOns: [
                  {
                    addOnId: 'A-101',
                    addOnName: 'Golf Equipment',
                    fee: '20.00'
                  }
                ]
              }
            ]
          }
        ]
      };

      const EXPECT_PLAN_LIST = [
        {
          planId: 'P-101',
          productId: 'P-101',
          planName: 'Basic',
          fee: '1000.00',
          addOns: [
            {
              addOnId: 'A-101',
              addOnName: 'Golf Equipment',
              fee: '20.00'
            }
          ]
        },
        {
          planId: 'P-201',
          productId: 'P-101',
          planName: 'Comprehensive',
          fee: '2000.00',
          addOns: [
            {
              addOnId: 'A-101',
              addOnName: 'Some Add On',
              fee: '20.00'
            }
          ]
        },
        {
          planId: 'P-112',
          productId: 'P-101',
          planName: 'Other',
          fee: '1000.00',
          addOns: [
            {
              addOnId: 'A-101',
              addOnName: 'Golf Equipment',
              fee: '20.00'
            }
          ]
        }
      ];

      const plans = plansSelectors.getPlanList(quote.products);
      expect(plans).to.deep.equal(EXPECT_PLAN_LIST);
    });

    it('should return empty plans when no products or no plans available', () => {
      const noProductsQuote = {};
      const emptyUndefinedProducts = plansSelectors.getPlanList(
        noProductsQuote.products
      );

      const noPlansProductsQuote = {
        products: []
      };
      const emptyNoPlansProduct = plansSelectors.getPlanList(
        noPlansProductsQuote.products
      );

      const invalidTypeProductQuote = {
        products: {}
      };
      const emptyInvalidProducts = plansSelectors.getPlanList(
        invalidTypeProductQuote.products
      );

      expect(emptyUndefinedProducts).to.deep.equal([]);
      expect(emptyNoPlansProduct).to.deep.equal([]);
      expect(emptyInvalidProducts).to.deep.equal([]);
    });
  });

  describe('getSelectedPlan', () => {
    it('should get the selected plan from the list of plans', () => {
      const plans = [
        {
          planId: 'P-101',
          planName: 'Basic',
          fee: '1000.00',
          addOns: [
            {
              addOnId: 'A-101',
              addOnName: 'Golf Equipment',
              fee: '20.00'
            }
          ]
        },
        {
          selected: true,
          planId: 'P-201',
          planName: 'Comprehensive',
          fee: '2000.00',
          addOns: [
            {
              addOnId: 'A-101',
              addOnName: 'Some Add On',
              fee: '20.00'
            }
          ]
        }
      ];

      const EXPECTED_SELECTED_PLAN = {
        selected: true,
        planId: 'P-201',
        planName: 'Comprehensive',
        fee: '2000.00',
        addOns: [
          {
            addOnId: 'A-101',
            addOnName: 'Some Add On',
            fee: '20.00'
          }
        ]
      };

      const selectedPlan = plansSelectors.getSelectedPlan(plans);

      expect(selectedPlan).to.deep.equal(EXPECTED_SELECTED_PLAN);
    });

    it('should return empty object when no plan is selected or invalid type of plans', () => {
      const invalidPlans = {};

      const noSelectedPlans1 = [{}];
      const noSelectedPlans2 = [];

      const noSelectedPlan1 = plansSelectors.getSelectedPlan(noSelectedPlans1);
      const noSelectedPlan2 = plansSelectors.getSelectedPlan(noSelectedPlans2);

      const noInvalidPlan = plansSelectors.getSelectedPlan(invalidPlans);
      expect(noSelectedPlan1).to.deep.equal({});
      expect(noSelectedPlan2).to.deep.equal({});
      expect(noInvalidPlan).to.deep.equal({});
    });
  });

  describe('getSelectedAddOns', () => {
    it('should get all selected addOns when addon is selected from a plan', () => {
      const plan = {
        addOns: [
          {
            selected: true,
            addOnName: 'addOn 1'
          },
          {
            selected: false,
            addOnName: 'addOn 2'
          },
          {
            addOnName: 'addOn 3'
          }
        ]
      };

      const EXPECTED_ADDONS = [
        {
          selected: true,
          addOnName: 'addOn 1'
        }
      ];

      const selectedAddons = plansSelectors.getSelectedAddOns(plan);
      expect(selectedAddons).to.deep.equal(EXPECTED_ADDONS);
    });

    it('should get empty addons when plan is invalid or no addOns available in plan', () => {
      const noAddOnsPlan = {
        addOns: []
      };

      const invalidPlan = {};
      const undefinedPlan = undefined;

      const noAddOns = plansSelectors.getSelectedAddOns(noAddOnsPlan);
      const invalidPlanAddons = plansSelectors.getSelectedAddOns(invalidPlan);
      const undefinedPlanAddOns = plansSelectors.getSelectedAddOns(
        undefinedPlan
      );

      expect(noAddOns).to.deep.equal([]);
      expect(invalidPlanAddons).to.deep.equal([]);
      expect(undefinedPlanAddOns).to.deep.equal([]);
    });
  });
});
