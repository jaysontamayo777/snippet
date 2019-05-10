import { expect } from 'chai';
import selectionReducer from './selectionReducer';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';
import initialState from './initialState';

const PLANS = [
  {
    planId: 'P-1',
    planName: 'Lower Limits',
    fee: 142.07,
    totalFee: 142.07,
    addOns: [
      {
        addOnId: 'A-1',
        addOnName: 'Golf Equipment',
        fee: 1
      },
      {
        addOnId: 'A-2',
        addOnName: 'Sports Equipme',
        fee: 1
      }
    ]
  },
  {
    planId: 'P-2',
    planName: 'Higher Limits',
    fee: 234.48,
    totalFee: 234.48,
    selected: true,
    addOns: [
      {
        addOnId: 'A-1',
        addOnName: 'Golf Equipment',
        fee: 1,
        selected: true
      },
      {
        addOnId: 'A-2',
        addOnName: 'Sports Equipme',
        fee: 1
      }
    ]
  }
];

const PLAN_1 = {
  planId: 'P-2',
  planName: 'Higher Limits',
  fee: 234.48,
  totalFee: 234.48,
  selected: true,
  addOns: [
    {
      addOnId: 'A-1',
      addOnName: 'Golf Equipment',
      fee: 1,
      selected: true
    },
    {
      addOnId: 'A-2',
      addOnName: 'Sports Equipme',
      fee: 1
    }
  ]
};

describe('Selection reducer', () => {
  it('should return initial state', () => {
    const actions = {
      type: 'DEFAULT'
    };

    expect(
      selectionReducer({ addOnIds: [], planId: '', productId: '' }, actions)
    ).to.deep.equal(initialState.selection);
  });

  it('should return selected plan and addons for an array of plans', () => {
    const actions = {
      type: types.PLAN_SELECTED,
      payload: PLANS
    };

    const expectation = {
      addOnIds: ['A-1'],
      fee: 234.48,
      planId: 'P-2',
      planName: 'Higher Limits',
      productId: '',
      selected: true,
      totalFee: 234.48
    };

    expect(selectionReducer(initialState.selection, actions)).to.deep.equal(
      expectation
    );
  });

  it('should return selected plan and addon for a plan', () => {
    const actions = {
      type: types.ADDON_SELECTED,
      payload: PLAN_1
    };

    const expectation = {
      addOnIds: ['A-1'],
      fee: 234.48,
      planId: 'P-2',
      planName: 'Higher Limits',
      productId: '',
      selected: true,
      totalFee: 234.48
    };
    expect(selectionReducer(initialState.selection, actions)).to.deep.equal(
      expectation
    );
  });

  it('should update when moving to another step', () => {
    const ORIGINAL_STATE = {
      originalState: true
    };

    const getAction = pathname => {
      return {
        type: types.LOCATION_CHANGE,
        payload: {
          pathname: pathname
        }
      };
    };

    expect(
      selectionReducer(ORIGINAL_STATE, getAction(paths.INDEX))
    ).to.deep.equal(initialState.selection);
    expect(
      selectionReducer(ORIGINAL_STATE, getAction(paths.PLAN_SELECTION))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      selectionReducer(ORIGINAL_STATE, getAction(paths.CUSTOMER_DETAILS))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      selectionReducer(ORIGINAL_STATE, getAction(paths.SUMMARY_DETAILS))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      selectionReducer(ORIGINAL_STATE, getAction(paths.PAYMENT))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      selectionReducer(ORIGINAL_STATE, getAction(paths.PAYMENT_CONFIRMATION))
    ).to.deep.equal(initialState.selection);
    expect(
      selectionReducer(ORIGINAL_STATE, getAction('DEFAULT'))
    ).to.deep.equal(initialState.selection);
  });
});
