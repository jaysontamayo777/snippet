import _ from 'lodash';
import { 
  SET_TRACKING_ID,
  GET_TRACKING_ID,
  SEND_TRACKING_REPORT,
  SET_TRACKING_UTM } from '../constants/actionTypes';
import { createReports, updateReports } from '../api/reports';
import { sendLogs } from '../api/logger';

export const getTrackingId = () => {
  return dispatch => {
    dispatch({
      type: GET_TRACKING_ID
    });
  };
};

export const setTrackingId = (trackingId) => {
  return dispatch => { 
    dispatch({
      type: SET_TRACKING_ID,
      trackingId
    });
  };
};

export const sendTrackReports = (report) => 
  {
    return dispatch => {
      const {
        agent,
        profile,
        selectedPlan,
        travellers,
        partner,
        trackingReport,
        stepVal,
        referenceNumber,
        agreements
      } = report;

      const { isTrackingSent, trackingId, source, medium, campaign, content } = trackingReport;
      const formattedTracking = _.omitBy({ trackingId, source, medium, campaign, content }, _.isNil);

      const { agentCode, agentName, agentEmailAddress } = agent;
      const formattedAgent = _.omitBy({ agentCode, agentName, agentEmailAddress }, _.isNil);
      delete partner.styles;

      const formattedReport = {
        formattedAgent,
        profile,
        selectedPlan,
        travellers,
        partner,
        formattedTracking,
        stepVal,
        referenceNumber,
        agreements
      };

      if (isTrackingSent) {
        updateReports(formattedReport)
          .then(() => {
            dispatch({
              type: SEND_TRACKING_REPORT,
              isTrackingSent: true
            });
          })
          .catch(error => {
            const errorLog = {
              error: error,
              source: 'Update Report Tracking'
            };
            sendLogs(errorLog);
          });
      } else {
        createReports(formattedReport)
        .then(() => {
          dispatch({
            type: SEND_TRACKING_REPORT,
            isTrackingSent: true
          });
        })
        .catch(error => {
          const errorLog = {
            error: error,
            source: 'Create Report Tracking'
          };
          sendLogs(errorLog);
        });
      }
    };
};

export const setTrackingUtm = (medium, source, campaign, content) => {
  return dispatch => {
    dispatch({
      type: SET_TRACKING_UTM,
      source,
      medium,
      campaign,
      content
    });
  }
}
