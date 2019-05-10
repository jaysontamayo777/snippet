import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import { syncTranslationWithStore, setLocale } from 'react-redux-i18n';
import 'mdn-polyfills/Object.assign';
import 'mdn-polyfills/Object.create';
import 'mdn-polyfills/Object.entries';
import 'mdn-polyfills/Array.from';
import 'mdn-polyfills/Array.of';
import 'mdn-polyfills/Array.prototype.find';
import 'mdn-polyfills/Array.prototype.forEach';
import 'mdn-polyfills/Array.prototype.filter';
import 'mdn-polyfills/Array.prototype.findIndex';
import 'mdn-polyfills/Array.prototype.includes';
import 'mdn-polyfills/Array.prototype.some';
import 'mdn-polyfills/String.prototype.includes';
import 'mdn-polyfills/String.prototype.repeat';
import 'mdn-polyfills/String.prototype.startsWith';
import 'mdn-polyfills/String.prototype.endsWith';
import 'mdn-polyfills/String.prototype.padStart';
import 'mdn-polyfills/String.prototype.padEnd';
import 'mdn-polyfills/Function.prototype.bind';
import 'mdn-polyfills/Node.prototype.append';
import 'mdn-polyfills/NodeList.prototype.forEach';
import 'mdn-polyfills/Node.prototype.children';
import 'mdn-polyfills/Element.prototype.closest';
import 'mdn-polyfills/Element.prototype.toggleAttribute';
import 'mdn-polyfills/Element.prototype.matches';
import 'mdn-polyfills/MouseEvent';
import 'mdn-polyfills/CustomEvent';
import 'mdn-polyfills/Number.isNaN';
import uuidv4 from 'uuid/v4';
import { loadContents } from './actions/contentActions';
import { setTrackingId } from './actions/trackingActions';
import configure, { history } from './store/configureStore';
import Router from './components/Router/Router'; // eslint-disable-line

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import _ from 'lodash';

import '@axa/web-toolkit/dist/bundles/all';

import './style/react-select.css';
import 'react-datetime/css/react-datetime.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-widgets/dist/css/react-widgets.css';

import './style/style.css';

Moment.locale('en');
momentLocalizer();

const store = configure();

syncTranslationWithStore(store);

persistStore(
  store,
  {
    storage: asyncSessionStorage,
    keyPrefix: 'AXA.travel.',
    blacklist: ['routing', 'payment'],
  },
  () => {
    const states = store.getState();
    const isReload =
      _.has(states, 'content.updateState') && states.content.updateState > 0;

    if (!isReload) {
      store.dispatch(setLocale('en'));
      store.dispatch(setTrackingId(uuidv4()));
      store.dispatch(loadContents());
    }

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('app')
    );
  }
);
