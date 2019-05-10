import { expect } from 'chai';
import { getSelectionData } from './planSelectionUtil';

describe('Plan Selection Util', () => {
  describe('Get selection data', () => {
    it('should return proper / exact format of selection data', () => {
      const EXPECTED_SELECTION_DATA = {
        totalFee: '1000.00',
        currency: 'PHP',
        planId: 'P-101',
        addOnIds: ['A-101']
      };

      const SELECTED_PLAN_DATA = {
        totalFee: '1000.00',
        currency: 'PHP',
        planId: 'P-101',
        addOns: [
          { addOnId: 'A-101', selected: true },
          { addOnId: 'A_102', selected: false }
        ]
      };

      expect(getSelectionData(SELECTED_PLAN_DATA)).to.deep.equal(
        EXPECTED_SELECTION_DATA
      );
    });

    it("should return empty list of addOnIds when addons aren't available", () => {
      const EXPECTED_SELECTION_DATA = {
        totalFee: '1000.00',
        currency: 'PHP',
        planId: 'P-101',
        addOnIds: []
      };

      const SELECTED_PLAN_DATA1 = {
        totalFee: '1000.00',
        currency: 'PHP',
        planId: 'P-101'
      };

      const SELECTED_PLAN_DATA2 = {
        totalFee: '1000.00',
        currency: 'PHP',
        planId: 'P-101',
        addOns: []
      };

      expect(getSelectionData(SELECTED_PLAN_DATA1)).to.deep.equal(
        EXPECTED_SELECTION_DATA
      );
      expect(getSelectionData(SELECTED_PLAN_DATA2)).to.deep.equal(
        EXPECTED_SELECTION_DATA
      );
    });
  });
});
