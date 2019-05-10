import { expect } from 'chai';
import { sendPaymentDetails, sendQuote } from './email';

describe.skip('Send Email', () => {
  describe('Send Email - Payment details', () => {
    it('should failed to send - missing information', done => {
      sendPaymentDetails()
        .then()
        .catch(err => {
          expect(err).to.exist;
          expect(err.response.status).to.equal(400);
          expect(err.response.data).to.equal('MISSING_REQUIRED_FIELDS');

          done();
        });
    });

    it('should failed to send - invalid email', done => {
      const details = {
        title: 'test',
        sender: 'test',
        comment: 'test'
      };

      sendPaymentDetails(details)
        .then()
        .catch(err => {
          expect(err).to.exist;
          expect(err.response.status).to.equal(400);
          expect(err.response.data).to.equal('INVALID_EMAIL');

          done();
        });
    });

    it('should send successfully', done => {
      const details = {
        title: 'test',
        sender: 'test@example.com',
        comment: 'test'
      };
      sendPaymentDetails(details).then(result => {
        expect(result).to.exist;
        expect(result.status).to.equal(200);
        expect(result.data).to.equal('SEND_EMAIL_SUCCESS');

        done();
      });
    });
  });

  describe('Send Email - Retrieve quote', () => {
    it('should failed to send', done => {
      sendQuote()
        .then()
        .catch(err => {
          expect(err).to.exist;
          expect(err.response.status).to.equal(400);
          expect(err.response.data).to.equal('MISSING_REQUIRED_FIELDS');

          done();
        });
    });

    it('should failed to send - invalid email', done => {
      const details = {
        encodedQuote: 'test',
        bodyEmail: 'test'
      };

      sendQuote(details)
        .then()
        .catch(err => {
          expect(err).to.exist;
          expect(err.response.status).to.equal(400);
          expect(err.response.data).to.equal('INVALID_EMAIL');

          done();
        });
    });

    it('should send successfully', done => {
      const details = {
        encodedQuote: 'test',
        bodyEmail: 'test@example.com'
      };
      sendQuote(details).then(result => {
        expect(result).to.exist;
        expect(result.status).to.equal(200);
        expect(result.data).to.equal('SEND_EMAIL_SUCCESS');

        done();
      });
    });
  });
});
