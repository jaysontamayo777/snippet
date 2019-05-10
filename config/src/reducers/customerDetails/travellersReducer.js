import { getPathname } from '../../lib/util';
import initialState from '../initialState';
import travellerTypes from '../../constants/travellerTypes';
import * as types from '../../constants/actionTypes';
import paths from '../../constants/routePaths';

export default function travellersReducer(
  state = initialState.travellers,
  action
) {
  const payload = action.payload;

  switch (action.type) {
    case types.TRAVELLER_FORM_INIT:
      const numberOfAdults = +payload.numberOfAdults || 0;
      const numberOfChildren = +payload.numberOfChildren || 0;

      return Object.assign(
        [],
        [..._generateList(state, numberOfAdults, travellerTypes.ADULT),
        ..._generateList(state, numberOfChildren, travellerTypes.CHILD)]
      );

    case types.TRAVELLER_FORM_UPDATE_FIELDS:
      const { travellerIndex, formFields, errors } = payload;

      if (formFields) {
        return Object.assign([], state, {
          [travellerIndex]: Object.assign({}, state[travellerIndex], {
            formFields,
            errors
          })
        });
      } else {
        return Object.assign([], state, {
          [travellerIndex]: Object.assign({}, state[travellerIndex], {
            errors
          })
        });
      }

    case types.TRAVELLER_FORM_IS_POLICY_HOLDER:
      const { travIndex, isPolicyHolder } = payload;
      const updatedTravellerState = { isPolicyHolder };

      if (!isPolicyHolder) {
        updatedTravellerState.formFields = Object.assign(
          {},
          initialState.traveller.formFields
        );
        updatedTravellerState.errors = Object.assign(
          {},
          initialState.traveller.errors
        );
      }

      return Object.assign([], state, {
        [travIndex]: Object.assign({}, state[travIndex], updatedTravellerState)
      });

    case types.TRAVELLER_OPEN:
      const { formIndex } = payload;

      return Object.assign([], state, {
        [formIndex]: Object.assign({}, state[formIndex], { isOpen: true })
      });

    case types.LOCATION_CHANGE:
      const originalState = initialState.travellers;
      const pathname = getPathname(action.payload);

      switch (pathname) {
        case paths.PLAN_SELECTION:
        case paths.CUSTOMER_DETAILS:
        case paths.SUMMARY_DETAILS:
        case paths.PAYMENT_CONFIRMATION:
        case paths.CUSTOMER_REVIEW:
        case paths.CUSTOMER_REFERRAL:
          return state;
        default:
          return originalState;
      }

    case types.INITIAL_STATE:
      return Object.assign([], initialState.travellers);

    default:
      return state;
  }
}

/**
 * Generates a list of travellers group by name.
 *
 * @param {Array[Object]} currentState
 * List of travellers from redux.
 *
 * @param {Number} count
 * Number of expected result
 *
 * @param {String} groupName
 * Valid values are 'adult' and 'child'
 */
function _generateList(currentState = [], count, groupName) {
  const list = currentState.filter(x => x.travellerType === groupName);
  const resultList = [];
  for (let i = 0; i < count; i++) {
    if (list[i]) {
      resultList.push(Object.assign({}, list[i]));
    } else {
      resultList.push(Object.assign(
        {},
        initialState.traveller,
        { travellerType: groupName, travellerTypeIndex: i }
      ));
    }
  }

  if (groupName === travellerTypes.ADULT) {
    resultList[0].isPolicyHolder = true;
  }

  return resultList;
}
