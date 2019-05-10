import { expect } from 'chai';
// import moment from 'moment';
import profileReducer from './profileReducer';
import * as types from '../constants/actionTypes';
// import RULES from '../constants/rules';
import initialState from './initialState';

describe('Profile reducer', () => {
  it('should return initial state', () => {
    const actions = {
      type: 'DEFAULT'
    };

    expect(profileReducer(initialState.profile, actions)).to.deep.equal(
      initialState.profile
    );
  });

  it('should update one field in the form', () => {
    const actions = {
      type: types.PROFILE_FORM_UPDATE,
      payload: {
        name: 'travelType',
        value: 'Annual Trip'
      }
    };

    expect(profileReducer(initialState.profile, actions).travelType).to.equal(
      'Annual Trip'
    );
  });

  // it('should update all fields in the form', () => {
  //   const VALID_FORM = {
  //     travelType: 'Single Trip',
  //     startDate: moment(new Date).add(5, 'days').format(RULES.DATE_FORMAT),
  //     endDate: moment(new Date).add(6, 'days').format(RULES.DATE_FORMAT),
  //     countries: [{
  //       value: 'Hong Kong',
  //       label: 'Hong Kong'
  //     }, {
  //       value: 'Asia',
  //       label: 'Asia'
  //     }],
  //     destination: ['Hong Kong', 'Asia'],
  //     isFamily: 'true',
  //     numberOfAdult: '2',
  //     numberOfChildren: '2',
  //     currency: 'USD'
  //   };
  //
  //   const actions = {
  //     type: types.PROFILE_FORM_UPDATE_ALL,
  //     payload: VALID_FORM
  //   };
  //
  //   expect(profileReducer(initialState.profile, actions))
  //     .to.contains(VALID_FORM);
  // });

  it('should update errors', () => {
    const actions = {
      type: types.PROFILE_VALIDATION_ERROR,
      payload: {
        errors: {
          travelType: 'valueRequired'
        }
      }
    };

    expect(profileReducer(initialState.profile, actions).errors).to.deep.equal({
      travelType: 'valueRequired'
    });
  });

  it('should stop loading when contento loading is done', () => {
    const actions = {
      type: types.CONTENT_UPDATE_SUCCESS
    };

    expect(profileReducer({}, actions).isLoading).to.deep.equal(false);
  });

  it('should be able to change currency', () => {
    const actions = {
      type: types.CURRENCY_CHANGE,
      payload: 'USD'
    };

    expect(
      profileReducer(initialState.profile, actions).currency
    ).to.deep.equal('USD');
  });

  it('should update currency upon get quote success', () => {
    const actions = {
      type: types.GET_QUOTE_SUCCESS,
      payload: {
        products: [
          {
            currency: 'PHP'
          }
        ]
      }
    };

    expect(
      profileReducer(initialState.profile, actions).currency
    ).to.deep.equal('PHP');
  });
});
