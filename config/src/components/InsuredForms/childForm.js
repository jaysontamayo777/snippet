import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { GENDER } from '../../constants/gender';

import BeneficiaryInfo from './beneficiaryinfo';
import { TextField, RadioButton, DatePicker } from '../AXAToolkit';

import * as P from './style';

class ChildForm extends Component {
  state = {
    openProposerBeneficiaryForm: false
  };

  toggleProposerBeneficiaryForm = () => {
    const { openProposerBeneficiaryForm } = this.state;
    this.setState({
      openProposerBeneficiaryForm: !openProposerBeneficiaryForm
    });
  };

  render() {
    const {
      travellerIndex,
      travellerInfo,
      onBlurTraveller,
      onBlurTravellerBeneficiary
    } = this.props;
    const { formFields, errors } = travellerInfo;

    const { openProposerBeneficiaryForm } = this.state;

    return (
      <P.Wrapper id="proposer">
        <P.Header>
          Child #{travellerInfo.travellerTypeIndex + 1} - Personal Information
        </P.Header>
        <P.Body>
          <P.Row>
            <P.FormGroup>
              <P.Label>First name</P.Label>
              <TextField
                bordered
                hasError={!!errors.firstName}
                placeholder="Juan"
                value={formFields.firstName}
                onBlur={e =>
                  onBlurTraveller(travellerIndex, 'firstName', e.target.value)
                }
              />

              {errors.firstName && (
                <P.ErrorMessage className="error-message">
                  {errors.firstName}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
            <P.FormGroup>
              <P.Label>Last name</P.Label>
              <TextField
                bordered
                hasError={!!errors.lastName}
                placeholder="Dela Cruz"
                value={formFields.lastName}
                onBlur={e =>
                  onBlurTraveller(travellerIndex, 'lastName', e.target.value)
                }
              />

              {errors.lastName && (
                <P.ErrorMessage className="error-message">
                  {errors.lastName}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
          </P.Row>

          <P.Row>
            <P.FormGroup>
              <P.Label>Middle initial (Optional)</P.Label>
              <div style={{ width: '45px' }}>
                <TextField
                  maxLength={1}
                  bordered
                  hasError={!!errors.middleInitial}
                  placeholder="A"
                  value={formFields.middleInitial}
                  onBlur={e =>
                    onBlurTraveller(
                      travellerIndex,
                      'middleInitial',
                      e.target.value
                    )
                  }
                />
              </div>

              {errors.middleInitial && (
                <P.ErrorMessage className="error-message">
                  {errors.middleInitial}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
            <P.FormGroup>
              <P.Label>Gender</P.Label>
              <P.InlineOptions style={{ paddingTop: '7px' }}>
                {GENDER.map((gender, index) => (
                  <RadioButton
                    key={index}
                    label={gender.value}
                    checked={formFields.gender === gender.value}
                    onClick={() =>
                      onBlurTraveller(travellerIndex, 'gender', gender.value)
                    }
                  />
                ))}
              </P.InlineOptions>

              {errors.gender && (
                <P.ErrorMessage className="error-message">
                  {errors.gender}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
          </P.Row>

          <P.Row>
            <P.FormGroup>
              <P.Label>Birthdate</P.Label>
              <DatePicker
                onKeyDown={e => e.preventDefault()}
                bordered
                placeholder="Birthdate"
                hasError={!!errors.dateOfBirth}
                time={false}
                value={
                  formFields.dateOfBirth
                    ? new Date(formFields.dateOfBirth)
                    : new Date()
                }
                onChange={value =>
                  onBlurTraveller(
                    travellerIndex,
                    'dateOfBirth',
                    moment(value).format('YYYY-MM-DD')
                  )
                }
              />
              {errors.dateOfBirth && (
                <P.ErrorMessage className="error-message">
                  {errors.dateOfBirth}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
            <P.FormGroup />
          </P.Row>

          <P.BeneficiaryWrapper>
            <P.BeneficiaryHeader onClick={this.toggleProposerBeneficiaryForm}>
              Beneficiary
              <P.CollapseArrow
                isOpen={openProposerBeneficiaryForm}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#333"
                  fillRule="nonzero"
                  d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                />
              </P.CollapseArrow>
            </P.BeneficiaryHeader>
            <P.BeneficiaryBody isOpen={openProposerBeneficiaryForm}>
              <BeneficiaryInfo
                travellerIndex={travellerIndex}
                beneficiaryInfo={formFields.beneficiary}
                beneficiaryInfoErrors={errors.beneficiary}
                travellerInfo={travellerInfo}
                onBlurTravellerBeneficiary={onBlurTravellerBeneficiary}
              />
            </P.BeneficiaryBody>
          </P.BeneficiaryWrapper>
        </P.Body>
      </P.Wrapper>
    );
  }
}

ChildForm.propTypes = {
  travellerIndex: PropTypes.number,
  travellerInfo: PropTypes.object,
  onBlurTraveller: PropTypes.func,
  onBlurTravellerBeneficiary: PropTypes.func
};

export default ChildForm;
