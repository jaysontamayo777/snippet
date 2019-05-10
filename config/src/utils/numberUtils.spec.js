import { expect } from 'chai';
import { insertDecimal } from './numberUtils';

describe('Number Utils', () => {
  describe('Insert Decimal Points', () => {
    it('should have decimal places', () => {
      const EXPECTED_VALUE_1 = '1000.00';
      const EXPECTED_VALUE_2 = '20.00';
      expect(insertDecimal(1000)).to.equal(EXPECTED_VALUE_1.toString());
      expect(insertDecimal(20)).to.equal(EXPECTED_VALUE_2);
    });

    it('should return decimal places based on given points', () => {
      const EXPECTED_VALUE_1 = '100.200121';
      const EXPECTED_VALUE_2 = '50.2001';
      expect(insertDecimal(100.2001212, 6)).to.equal(EXPECTED_VALUE_1);
      expect(insertDecimal(50.200124, 4)).to.equal(EXPECTED_VALUE_2);
    });

    it('should round decimal places by the given points', () => {
      const EXPECTED_VALUE_1 = '100.234';
      const EXPECTED_VALUE_2 = '50.25';
      expect(insertDecimal(100.2335, 3)).to.equal(EXPECTED_VALUE_1);
      expect(insertDecimal(50.245, 2)).to.equal(EXPECTED_VALUE_2);
    });
  });
});
