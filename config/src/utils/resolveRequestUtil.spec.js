import { expect } from 'chai';
import resolveRequest from './resolveRequestUtil';

describe('Resolve Request Util', () => {
  describe('Get resolve data', () => {
    it('should return data after a duration of time', done => {
      const delay = 1000;
      const DATA = {
        status: 200,
        message: 'Success',
        payload: {}
      };

      resolveRequest(DATA, delay).then(data => {
        expect(data).to.deep.equal(DATA);
        done();
      });
    });

    it('should return data after a duration of time and get the default 2000 delay time', done => {
      const delay = undefined;
      const DATA = {
        status: 200,
        message: 'Success',
        payload: {}
      };

      resolveRequest(DATA, delay).then(data => {
        expect(data).to.deep.equal(DATA);
        done();
      });
    });
  });
});
