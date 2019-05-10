import _ from 'lodash';
import axios from 'axios';
import config from '../config';
import { constructReportsPayload } from '../utils/apiUtils';

export const createReports = (report) => {
  const reportsPayload = constructReportsPayload(report);
  const trackingId = _.get(report, 'formattedTracking.trackingId');

  return axios.post(
    `${config.mwUrl}/reports`,
    reportsPayload,
    {
      headers: {
        'X-Request-ID': trackingId
      }
    }
  );
}

export const updateReports = (report) => {
  const reportsPayload = constructReportsPayload(report);
  const trackingId = _.get(report, 'formattedTracking.trackingId');

  return axios.put(
    `${config.mwUrl}/reports/${trackingId}`,
    reportsPayload,
    {
      headers: {
        'X-Request-ID': trackingId
      }
    }
  )
}