import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import agentReducer from './agentReducer';
import quoteReducer from './quoteReducer';
import profileReducer from './profileReducer';
import plansReducer from './plansReducer';
import selectionReducer from './selectionReducer';
import customerFormReducer from './customerDetails/customerFormReducer';
import travellerReducer from './customerDetails/travellerReducer';
import travellersReducer from './customerDetails/travellersReducer';
import policyHolderReducer from './customerDetails/policyHolderReducer';
import orderReducer from './orderReducer';
import contentReducer from './contentReducer';
import agreementsReducer from './agreementsReducer';
import paymentReducer from './paymentReducer';
import stepReducer from './stepReducer';
import tagCommanderReducer from './tagCommanderReducer';
import partnerReducer from './partnerReducer';
import trackingReducer from './trackingReducer';
import promoCodeReducer from './promoCodeReducer';
import { i18nReducer } from 'react-redux-i18n';

const rootReducer = combineReducers({
  quote: quoteReducer,
  profile: profileReducer,
  plans: plansReducer,
  selection: selectionReducer,
  routing: routerReducer,
  customerForm: customerFormReducer,
  traveller: travellerReducer,
  travellers: travellersReducer,
  policyHolder: policyHolderReducer,
  order: orderReducer,
  content: contentReducer,
  agreements: agreementsReducer,
  payment: paymentReducer,
  step: stepReducer,
  i18n: i18nReducer,
  tagCommanderTrigger: tagCommanderReducer,
  partner: partnerReducer,
  trackingReport: trackingReducer,
  agent: agentReducer,
  promoCodeValidations: promoCodeReducer
});

export default rootReducer;
