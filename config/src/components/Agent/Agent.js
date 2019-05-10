import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '../AXAToolkit';
import { saveAgentDetails } from '../../actions/agentActions';
import { I18n } from 'react-redux-i18n';

import * as A from './style';

class Agent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { agent, saveAgentDetails } = this.props;

    return (
      <A.Container>
        <A.Title>{I18n.t('agent-component.title')}</A.Title>

        <A.InlineForm>
          <TextField
            type="text"
            placeholder={I18n.t('agent-component.agentCode')}
            onBlur={e => saveAgentDetails({ agentCode: e.target.value })}
            bordered
            value={agent.agentCode}
            hasError={!agent.isValid}
          />
        </A.InlineForm>

        {!agent.isValid && (
          <A.ErrorMessage className="error-message">
            {I18n.t('agent-component.invalidAgentCode')}
          </A.ErrorMessage>
        )}
      </A.Container>
    );
  }
}

Agent.propTypes = {
  agent: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  saveAgentDetails: PropTypes.func.isRequired
};

function mapStateToProps({ agent, i18n }) {
  return {
    agent,
    i18n
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveAgentDetails
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Agent);
