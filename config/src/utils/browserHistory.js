import { history } from '../store/configureStore';

/**
 * Do same behavior as react-router's browserHistory.push()
 * but allows replace of :locale in URL for localization.
 *
 * @param {string} url
 * Constant URL value you want to redirect.
 */
function push(url = '') {
  return history.push(url);
}

export default {
  push
};
