import _ from 'lodash';
import { loadTranslations } from 'react-redux-i18n';

import { getContento } from '../api/content';
import { sendLogs } from '../api/logger';
import * as types from '../constants/actionTypes';
import localization from '../localization';

function getContentoSuccess(payload) {
  return { type: types.CONTENT_UPDATE_SUCCESS, payload };
}

function getContentoError() {
  return { type: types.CONTENT_UPDATE_ERROR };
}

/**
 * Load Contento and Localization
 *
 * Get contents then add to locales
 */
export const loadContents = () => {
  return dispatch => {
    return getContento()
      .then(response => {
        const { mega_menu, footer, head } = response.data.en;
        const contents = {
          en: { ...response.data.en['ph-travel'], mega_menu, footer, head },
        };

        if (contents) {
          const obj = {};
          const keys = _.keys(contents);

          _.forEach(keys, key => {
            obj[key] = {
              ...localization[key],
              contento: contents[key]
            };
          });

          dispatch(loadTranslations(obj));
          dispatch(getContentoSuccess(contents));
        }
      })
      .catch(err => {
        const errorLog = {
          error: err,
          source: 'Get Contento'
        };

        sendLogs(errorLog);
        dispatch(getContentoError());
      });
  };
};
