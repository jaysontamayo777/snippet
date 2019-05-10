export const INITIAL_STATE = 'INITIAL_STATE';

/**
 * Quotation action types
 */
export const GET_QUOTE = 'GET_QUOTE';
export const GET_QUOTE_SUCCESS = 'GET_QUOTE_SUCCESS';
export const GET_QUOTE_ERROR = 'GET_QUOTE_ERROR';
export const GET_QUOTE_VALIDATION_ERROR = 'GET_QUOTE_VALIDATION_ERROR';

/**
 * Content action types
 */
export const CONTENT_UPDATE_SUCCESS = 'CONTENT_UPDATE_SUCCESS';
export const CONTENT_UPDATE_ERROR = 'CONTENT_UPDATE_ERROR';
export const REFERENCE_UPDATE_SUCCESS = 'REFERENCE_UPDATE_SUCCESS';
export const REFERENCE_UPDATE_ERROR = 'REFERENCE_UPDATE_SUCCESS';

/**
 * Profile action types
 */
export const PROFILE_FORM_UPDATE = 'PROFILE_FORM_UPDATE';
export const PROFILE_FORM_UPDATE_ALL = 'PROFILE_FORM_UPDATE_ALL';
export const PROFILE_VALIDATION_ERROR = 'PROFILE_VALIDATION_ERROR';

/**
 * Plans action types
 */
export const LOAD_PLANS = 'LOAD_PLANS';
export const PLAN_SELECTED = 'PLAN_SELECTED';
export const ADDON_SELECTED = 'ADDON_SELECTED';
export const INIT_PLAN_SELECTED = 'INIT_PLAN_SELECTED';

/**
 * Customer Details action types
 */
export const GO_TO_NEXT_FORM = 'GO_TO_NEXT_FORM';
export const GO_TO_SELECTED_FORM = 'GO_TO_SELECTED_FORM';

/**
 * Traveller action types
 */
export const TRAVELLER_FORM_INIT = 'TRAVELLER_FORM_INIT';
export const TRAVELLER_FORM_UPDATE_FIELDS = 'TRAVELLER_FORM_UPDATE_FIELDS';
export const TRAVELLER_FORM_IS_POLICY_HOLDER =
  'TRAVELLER_FORM_IS_POLICY_HOLDER';
export const TRAVELLER_OPEN = 'TRAVELLER_OPEN';

/**
 * Policy Holder action types
 */
export const POLICY_HOLDER_FORM_UPDATE_FIELDS =
  'POLICY_HOLDER_FORM_UPDATE_FIELDS';

/**
 * Aggreements action types
 */

export const TERMS_AND_CONDITIONS_ACCEPTED = 'TERMS_AND_CONDITIONS_ACCEPTED';

/**
 * Order action types
 */
export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_REFERENCE_SUCCESS = 'GET_ORDER_REFERENCE_SUCCESS';
export const GET_ORDER_REFERENCE_ERROR = 'GET_ORDER_REFERENCE_ERROR';

/**
 * Payment action types
 */
export const PAYMENT = 'PAYMENT';
// PAYMENT_INFO_*: status after initial submission of order information
export const PAYMENT_INFO_SUCCESS = 'PAYMENT_INFO_SUCCESS';
export const PAYMENT_INFO_ERROR = 'PAYMENT_INFO_ERROR';
export const GET_PAYMENT = 'GET_PAYMENT';
export const GET_PAYMENT_STATUS_SUCCESS = 'GET_PAYMENT_STATUS_SUCCESS';
export const GET_PAYMENT_STATUS_ERROR = 'GET_PAYMENT_STATUS_ERROR';

/**
 * Location action types
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

/**
 * Language action types
 */
export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';
export const CURRENCY_CHANGE = 'CURRENCY_CHANGE';

/**
 * Step action types
 */
export const SET_STARTUP_PAGE = 'SET_STARTUP_PAGE';
export const SET_PROGRESS = 'SET_PROGRESS';
export const SET_CURRENT_STEP = 'SET_CURRENT_STEP';

/**
 * Tag Commander action types
 */
export const SET_PAYMENT_SUCCESS_TAG = 'SET_PAYMENT_SUCCESS_TAG';
export const SET_PAYMENT_FAILED_TAG = 'SET_PAYMENT_FAILED_TAG';

/**
 * Block list action types
 */
export const GET_BLOCK_LISTS = 'GET_BLOCK_LISTS';
export const GET_BLOCK_LISTS_SUCCESS = 'GET_BLOCK_LISTS_SUCCESS';
export const GET_BLOCK_LISTS_ERROR = 'GET_BLOCK_LISTS_ERROR';

/**
 * Partner action types
 */
export const SET_PARTNER = 'SET_PARTNER';

/**
 * SSRS Tracking
 */
export const SET_TRACKING_ID = 'SET_TRACKING_ID';
export const GET_TRACKING_ID = 'GET_TRACKING_ID';
export const SEND_TRACKING_REPORT = 'SEND_TRACKING_REPORT';
export const SET_TRACKING_UTM = 'SET_TRACKING_UTM';

/**
 * Agent action types
 */
export const VALIDATE_AGENT_SUCCESS = 'VALIDATE_AGENT_SUCCESS';
export const VALIDATE_AGENT_ERROR = 'VALIDATE_AGENT_ERROR';
export const SET_AGENT_DETAILS = 'SET_AGENT_DETAILS';

export const SET_PROMO_CODE_VALIDATIONS = 'SET_PROMO_CODE_VALIDATIONS';
