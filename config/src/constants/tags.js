// ====  V I R T U A L   P A G E S   T A G S  ====
/**
 * Send this constant when the user sees the ADDONS
 * component after selecting a plan.
 */
export const ADDONS = {
  pagename: 'travel::quote_page_step2_get_quote'
};

/**
 * Send this constant when the user enters the CUSTOMER REVIEW
 * page.
 */
export const CUSTOMER_REVIEW = {
  pagename: 'travel::detail_step4_summary'
};

// ====  C L I C K   T A G S  ====
/**
 * Send this constant when the user clicks the number
 * or contact us link within the Header and currentt page of the
 * user is CUSTOMER DETAILS
 */
export const CUSTOMER_DETAILS_CONTACT_US = {
  category: 'travel_detail_page',
  action: 'top_phone_button',
  label: 'button_click'
};

/**
 * Send this constant when the user clicks the number
 * or contact us link within the Header and currentt page of the
 * user is PLAN SELECTION
 */
export const PLAN_SELECTION_CONTACT_US = {
  category: 'travel_quote_page',
  action: 'top_phone_button',
  label: 'button_click'
};

/**
 * Send this constant when the user clicks on the
 * Download Brochure link within the How to choose component.
 */
export const HOW_TO_CHOOSE_DOWNLOAD_BROCHURE = {
  category: 'travel_quote_page',
  action: 'download_brochure',
  label: 'travel_plan_click'
};

/**
 * Send this constant when the user clicks the SEND button within
 * the Send Quote component. Take note that this should ONLY send
 * if email validation is successful.
 */
export const PLAN_SELECTION_SEND_QUOTE = {
  category: 'travel_quote_page',
  action: 'save_quote_email',
  label: 'button_click'
};

/**
 * Send this constant when the user clicks the SEND button within
 * the Send Quote component in Customer Details. Take note that
 * this should ONLY send if email validation is successful.
 */
export const CUSTOMER_DETAILS_SEND_QUOTE = {
  category: 'travel_detail_page',
  action: 'save_quote_email',
  label: 'button_click'
};

/**
 * Send these values with 'action' and 'label' when the user clicks the
 * NEXT button on Customer Review page before redirecting to PayDollar.
 *
 * @param {string} action
 * Valid values are 'single' and 'annual'.
 *
 * @param {string} label
 * This field depends on the traveler type and number. Sample values are:
 * 'adult_1', 'adult_2', 'child_1' so on.
 */
export const CUSTOMER_REVIEW_COVER_TYPE = {
  category: 'travel_summary_page',
  action: '',
  label: ''
};

// ====  C L I C K   T A G S   F O R   P H ====

/**
 * Send this constant when the user clicks the 'Get Quote' button
 * located on the Header.
 */
export const BANNER_GET_QUOTE = {
  interaction_category: 'SmartTraveller',
  interaction_name: 'traveller::button_click',
  interaction_detail: ''
};

export const WIDGET_GET_QUOTE = {
  interaction_category: 'SmartTraveller',
  interaction_name: 'traveller::button_click',
  interaction_detail: 'traveller::get_a_quote_after_travel_details',
};

export const PLANS_TABLE_SELECTION = {
  'Essential': {
    interaction_category: 'SmartTraveller',
    interaction_name: 'traveller::button_click',
    interaction_detail: 'traveller::essential_quotation',
  },
  'Classic': {
    interaction_category: 'SmartTraveller',
    interaction_name: 'traveller::button_click',
    interaction_detail: 'traveller::classic_quotation',
  },
  'Elite': {
    interaction_category: 'SmartTraveller',
    interaction_name: 'traveller::button_click',
    interaction_detail: 'traveller::elite_quotation',
  },
  'Domestic': {
    interaction_category: 'SmartTraveller',
    interaction_name: 'traveller::button_click',
    interaction_detail: 'traveller::select_domestic'
  }
};

export const BASKET_BUY_NOW = {
  interaction_category: 'SmartTraveller',
  interaction_name: 'traveller::button_click',
  interaction_detail: 'traveller::buy_now_after_summary'
};

export const REVIEW_PAGE_PAY_NOW = {
  interaction_category: 'SmartTraveller',
  interaction_name: 'traveller::button_click',
  interaction_detail: 'traveller::pay_now'
};
