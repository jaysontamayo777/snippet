import _ from 'lodash';
import { getOrderReference } from '../api/order';
import * as types from '../constants/actionTypes';
import { getSelectionData } from '../utils/planSelectionUtil';
import { sendLogs } from '../api/logger';
import { updateReports } from '../api/reports';

export function purchaseOrder(
  agent,
  profile,
  selectedPlan,
  travellers,
  partner = {},
  onPayment,
  trackingReport,
  stepVal,
  agreements
) {
  return dispatch => {
    let selectionData = getSelectionData(selectedPlan);

    dispatch({ type: types.GET_ORDER });
    return getOrderReference(
      agent,
      profile,
      selectionData,
      travellers,
      partner,
      trackingReport,
      agreements
    )
      .then(response => {
        dispatch({
          type: types.GET_ORDER_REFERENCE_SUCCESS,
          payload: response.data.orderReference
        });
        const { trackingId, source, medium, campaign, content } = trackingReport;
        const formattedTracking = _.omitBy({ trackingId, source, medium, campaign, content }, _.isNil);

        const { agentCode, agentName, agentEmailAddress } = agent;
        const formattedAgent = _.omitBy({ agentCode, agentName, agentEmailAddress }, _.isNil);

        delete partner.styles;
        const report = {
          formattedAgent,
          profile,
          selectedPlan,
          travellers,
          partner,
          formattedTracking,
          stepVal,
          referenceNumber: response.data.orderReference
        };

        updateReports(report)
          .then(() => {
            dispatch({
              type: types.SEND_TRACKING_REPORT,
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

        // call action payment
        onPayment();
      })
      .catch(error => {
        const errorLog = {
          error: error,
          source: 'Get Order Reference'
        };

        sendLogs(errorLog);

        dispatch({ type: types.GET_ORDER_REFERENCE_ERROR, payload: error });
      });
  };
}
