import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TextField, DatePicker } from '../AXAToolkit';

import * as P from './style';

class BeneficiaryInfo extends Component {
  render() {
    const {
      travellerIndex,
      beneficiaryInfo,
      beneficiaryInfoErrors,
      onBlurTravellerBeneficiary
    } = this.props;

    return (
      <div>
        <P.Row>
          <P.FormGroup>
            <P.Label>First name</P.Label>
            <TextField
              bordered
              hasError={
                beneficiaryInfoErrors && !!beneficiaryInfoErrors.firstName
              }
              placeholder="Juan"
              value={beneficiaryInfo.firstName}
              onBlur={e =>
                onBlurTravellerBeneficiary(
                  travellerIndex,
                  'firstName',
                  e.target.value
                )
              }
            />

            {beneficiaryInfoErrors && beneficiaryInfoErrors.firstName && (
              <P.ErrorMessage className="error-message">
                {beneficiaryInfoErrors && beneficiaryInfoErrors.firstName}
              </P.ErrorMessage>
            )}
          </P.FormGroup>
          <P.FormGroup>
            <P.Label>Last name</P.Label>
            <TextField
              bordered
              hasError={
                beneficiaryInfoErrors && !!beneficiaryInfoErrors.lastName
              }
              placeholder="Dela Cruz"
              value={beneficiaryInfo.lastName}
              onBlur={e =>
                onBlurTravellerBeneficiary(
                  travellerIndex,
                  'lastName',
                  e.target.value
                )
              }
            />

            {beneficiaryInfoErrors && beneficiaryInfoErrors.lastName && (
              <P.ErrorMessage className="error-message">
                {beneficiaryInfoErrors && beneficiaryInfoErrors.lastName}
              </P.ErrorMessage>
            )}
          </P.FormGroup>
        </P.Row>

        <P.Row>
          <P.FormGroup>
            <P.Label>Middle initial</P.Label>
            <div style={{ width: '45px' }}>
              <TextField
                maxLength={1}
                bordered
                hasError={
                  beneficiaryInfoErrors && !!beneficiaryInfoErrors.middleInitial
                }
                placeholder="A"
                value={beneficiaryInfo.middleInitial}
                onBlur={e =>
                  onBlurTravellerBeneficiary(
                    travellerIndex,
                    'middleInitial',
                    e.target.value
                  )
                }
              />
            </div>

            {beneficiaryInfoErrors && beneficiaryInfoErrors.middleInitial && (
              <P.ErrorMessage className="error-message">
                {beneficiaryInfoErrors && beneficiaryInfoErrors.middleInitial}
              </P.ErrorMessage>
            )}
          </P.FormGroup>
          <P.FormGroup>
            <P.Label>Birthdate</P.Label>
            <DatePicker
              onKeyDown={e => e.preventDefault()}
              bordered
              placeholder="Birthdate"
              hasError={
                beneficiaryInfoErrors && !!beneficiaryInfoErrors.dateOfBirth
              }
              time={false}
              value={
                beneficiaryInfo.dateOfBirth
                  ? new Date(beneficiaryInfo.dateOfBirth)
                  : new Date()
              }
              onChange={value =>
                onBlurTravellerBeneficiary(
                  travellerIndex,
                  'dateOfBirth',
                  moment(value).format('YYYY-MM-DD')
                )
              }
            />

            {beneficiaryInfoErrors && beneficiaryInfoErrors.dateOfBirth && (
              <P.ErrorMessage className="error-message">
                {beneficiaryInfoErrors && beneficiaryInfoErrors.dateOfBirth}
              </P.ErrorMessage>
            )}
          </P.FormGroup>
        </P.Row>

        <P.Row>
          <P.FormGroup>
            <P.Label>Relationship to assured</P.Label>
            <TextField
              bordered
              placeholder="Relationship"
              value={beneficiaryInfo.relationship}
              onBlur={e =>
                onBlurTravellerBeneficiary(
                  travellerIndex,
                  'relationship',
                  e.target.value
                )
              }
            />

             {beneficiaryInfoErrors && beneficiaryInfoErrors.relationship && (
              <P.ErrorMessage className="error-message">
                {beneficiaryInfoErrors && beneficiaryInfoErrors.relationship}
              </P.ErrorMessage>
            )}
          </P.FormGroup>
          <P.FormGroup>
            <P.Label>Mobile No.</P.Label>
            <TextField
              bordered
              hasError={
                beneficiaryInfoErrors && !!beneficiaryInfoErrors.contactNumber
              }
              placeholder="Mobile no."
              value={beneficiaryInfo.contactNumber}
              onBlur={e =>
                onBlurTravellerBeneficiary(
                  travellerIndex,
                  'contactNumber',
                  e.target.value
                )
              }
            />

            {beneficiaryInfoErrors && beneficiaryInfoErrors.contactNumber && (
              <P.ErrorMessage className="error-message">
                {beneficiaryInfoErrors && beneficiaryInfoErrors.contactNumber}
              </P.ErrorMessage>
            )}
          </P.FormGroup>
        </P.Row>
      </div>
    );
  }
}

BeneficiaryInfo.propTypes = {
  travellerIndex: PropTypes.number,
  beneficiaryInfo: PropTypes.object,
  beneficiaryInfoErrors: PropTypes.object,
  onBlurTravellerBeneficiary: PropTypes.func
};

export default BeneficiaryInfo;
