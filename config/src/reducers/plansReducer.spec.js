import { expect } from 'chai';
import plansReducer from './plansReducer';
import * as types from '../constants/actionTypes';
import initialState from './initialState';
import paths from '../constants/routePaths';

describe('Plan reducer', () => {
  it('should return initial state', () => {
    const actions = {
      type: 'DEFAULT'
    };

    expect(plansReducer(initialState.plans, actions)).to.deep.equal(
      initialState.plans
    );
  });

  it('should add totalFee for each plan', () => {
    const actions = {
      type: types.LOAD_PLANS,
      payload: [
        {
          fee: 100,
          totalFee: 100
        },
        {
          fee: 200,
          totalFee: 200
        }
      ]
    };

    expect(plansReducer(initialState.plans, actions)).to.deep.equal([
      {
        fee: 100,
        totalFee: 100
      },
      {
        fee: 200,
        totalFee: 200
      }
    ]);
  });

  it('should update when moving to another step', () => {
    const ORIGINAL_STATE = ['true'];

    const getAction = pathname => {
      return {
        type: types.LOCATION_CHANGE,
        payload: {
          pathname: pathname
        }
      };
    };

    expect(
      plansReducer(ORIGINAL_STATE, getAction(paths.PLAN_SELECTION))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      plansReducer(ORIGINAL_STATE, getAction(paths.CUSTOMER_DETAILS))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      plansReducer(ORIGINAL_STATE, getAction(paths.SUMMARY_DETAILS))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      plansReducer(ORIGINAL_STATE, getAction(paths.PAYMENT))
    ).to.deep.equal(ORIGINAL_STATE);
  });
});
