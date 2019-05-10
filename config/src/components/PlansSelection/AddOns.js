import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BaseBox, BaseContent, BaseHeader } from '../BaseBox';
import { getSelectedPlan } from '../../selectors/plansSelectors';
import { getAddOnsReference } from '../../utils/contentoUtil';
import { I18n } from 'react-redux-i18n';
import { scrollToId } from '../../utils/scrollUtils';
import { currencySeparator } from '../../utils/numberUtils';

// Tag Commander
import { tagVirtualPage } from '../../lib/tag';
import {
  ADDONS
} from '../../constants/tags';

class Addons extends React.Component {
  componentDidMount() {
    scrollToId('addons-container');    
    tagVirtualPage(ADDONS);
  }

  render() {
    const { addOns, onSelectAddon, addOnsReference } = this.props;
    return (
      <BaseBox id="addons-container">
        <BaseHeader>
          <span className="section-header section-header--sm">{I18n.t('addons.yourOptions')}</span>
        </BaseHeader>
        <BaseContent className="nopadding">
          {/* {addOns.map((addon, idx) => (
            <div className="addon-content-row" key={idx}>
              <div className="addon-content-row__col-1">
                <img src={addOnsReference[addon.addOnId].image} alt="addon-icon" />
              </div>
              <div className="addon-content-row__col-2">
                <span className="addon-header">{addOnsReference[addon.addOnId].addon_name}</span>
                {addOnsReference[addon.addOnId].addon_content && <span className="addon-content">
                  {addOnsReference[addon.addOnId].addon_content && addOnsReference[addon.addOnId].addon_content.map(content => (
                    <span key={idx}>
                      {content}
                    </span>
                  ))}
                </span>}
                {addOnsReference[addon.addOnId].addon_remarks && <div className="addon-remarks">
                  <span className="addon-remarks__icon">
                    <span className="glyphicon glyphicon-stats"></span>
                  </span>
                  <span className="addon-remarks__content">
                    {addOnsReference[addon.addOnId].addon_remarks && addOnsReference[addon.addOnId].addon_remarks.map(remarks => (
                      <span key={idx}>
                        {remarks}
                      </span>
                    ))}
                  </span>
                </div>}
              </div>
              <div className="addon-content-row__col-3">
                <span className="addon-price">{I18n.t('currency.phpLeft')}{currencySeparator(addon.fee)}{I18n.t('currency.phpRight')}</span>
                {addon.selected
                  ? (<button onClick={() => onSelectAddon(addon.addOnId)} className="btn btn-ghost">{I18n.t('addons.remove')}</button>)
                  : (<button onClick={() => onSelectAddon(addon.addOnId)} className="btn btn-axa-blue">{`+ ${I18n.t('addons.add')}`}</button>)
                }
              </div>
            </div>
          ))} */}
        </BaseContent>
      </BaseBox>
    );
  }
}

Addons.propTypes = {
  onSelectAddon: PropTypes.func,
	i18n: PropTypes.object,
  addOns: PropTypes.array,
  addOnsReference: PropTypes.object
};

function mapStateToProps({ i18n, plans }) {
  const addOns = getSelectedPlan(plans).addOns || [];
  return {
    i18n,
    addOns,
    addOnsReference: getAddOnsReference(addOns, i18n)
  };
}

export default connect(mapStateToProps)(Addons);
