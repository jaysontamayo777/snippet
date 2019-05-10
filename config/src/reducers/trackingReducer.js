import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function trackingReducer(state = initialState.trackingReport, action) {
  switch (action.type) {
    case types.SET_TRACKING_ID:
      return objectAssign({}, state, {
        ...state,
        trackingId: action.trackingId
      });
    
    case types.GET_TRACKING_ID: 
      return state;

    case types.SEND_TRACKING_REPORT: 
      return objectAssign({}, state, {
        ...state,
        isTrackingSent: action.isTrackingSent
      });

    case types.SET_TRACKING_UTM: {
      return objectAssign({}, state, {
        ...state,
        source: action.source,
        medium: action.medium,
        campaign: action.campaign, 
        content: action.content
      });
    }
    
    default:
      return state;
  }
}