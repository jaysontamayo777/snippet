import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { GENDER } from '../../constants/gender';
import { OCCUPATIONS } from '../../constants/occupations';

import BeneficiaryInfo from './beneficiaryinfo';

import { Dropdown, RadioButton, TextField, DatePicker } from '../AXAToolkit';

import * as P from './style';

class AdultForm extends Component {
  state = {
    openProposerBeneficiaryForm: false,
    tooltipOpen: false
  };

  toggleProposerBeneficiaryForm = () => {
    const { openProposerBeneficiaryForm } = this.state;
    this.setState({
      openProposerBeneficiaryForm: !openProposerBeneficiaryForm
    });
  };

  toggleToolTip = () => {
    const { tooltipOpen } = this.state;

    this.setState({
      tooltipOpen: !tooltipOpen
    });
  }

  openToggle = (e) => {
    this.setState({ tooltipOpen: true });
  }

  _onBlurAddress = (index, str, targetValue) => {
    this.props.onBlurTraveller(index, str, targetValue);
    this.setState({ tooltipOpen: false });
  }

  render() {
    const {
      travellerIndex,
      travellerInfo,
      onBlurTraveller,
      onBlurTravellerBeneficiary,
      toolTipText
    } = this.props;
    const { formFields, errors } = travellerInfo;

    const { openProposerBeneficiaryForm, tooltipOpen } = this.state;

    const idTypes = ['GSIS', 'SSS', 'TIN', 'PASSPORT', "DRIVER'S LICENSE"];

    return (
      <P.Wrapper id="proposer">
        <P.Header>
          Traveller #{travellerInfo.travellerTypeIndex + 1} (Adult) - Personal
          Information
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
                    value={formFields.gender}
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
            <P.FormGroup>
              <P.Label>Occupation</P.Label>
              <Dropdown
                bordered
                hasError={!!errors.occupation}
                data={OCCUPATIONS.map(occupation => occupation.position)}
                placeholder="Nature of work"
                value={formFields.occupation}
                onChange={value =>
                  onBlurTraveller(travellerIndex, 'occupation', value)
                }
              />

              {errors.occupation && (
                <P.ErrorMessage className="error-message">
                  {errors.occupation}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
          </P.Row>

          <P.Row>
            <P.FormGroup>
              <P.Label>ID Type</P.Label>
              <Dropdown
                bordered
                hasError={!!errors.idType}
                data={idTypes}
                value={formFields.idType}
                onChange={value =>
                  onBlurTraveller(travellerIndex, 'idType', value)
                }
              />

              {errors.idType && (
                <P.ErrorMessage className="error-message">
                  {errors.idType}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
            <P.FormGroup>
              <P.Label>ID No.</P.Label>
              <TextField
                bordered
                hasError={!!errors.idNumber}
                placeholder="0000-000-0000"
                value={formFields.idNumber}
                onBlur={e =>
                  onBlurTraveller(travellerIndex, 'idNumber', e.target.value)
                }
              />

              {errors.idNumber && (
                <P.ErrorMessage className="error-message">
                  {errors.idNumber}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
          </P.Row>

          <P.Row>
            <P.Remarks>
              Note: An AXA representative or a financial executive may contact
              you to get identification card information.
            </P.Remarks>
          </P.Row>

          <P.Row>
            <P.FormGroup>
              <P.Label>Email</P.Label>
              <TextField
                bordered
                hasError={!!errors.emailAddress}
                placeholder="youremail@email.com"
                value={formFields.emailAddress}
                onBlur={e =>
                  onBlurTraveller(
                    travellerIndex,
                    'emailAddress',
                    e.target.value
                  )
                }
              />

              {errors.emailAddress && (
                <P.ErrorMessage className="error-message">
                  {errors.emailAddress}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
            <P.FormGroup>
              <P.Label>Mobile No.</P.Label>
              <TextField
                bordered
                hasError={!!errors.contactNumber}
                placeholder="Mobile no."
                value={formFields.contactNumber}
                onBlur={e =>
                  onBlurTraveller(
                    travellerIndex,
                    'contactNumber',
                    e.target.value
                  )
                }
              />

              {errors.contactNumber && (
                <P.ErrorMessage className="error-message">
                  {errors.contactNumber}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
          </P.Row>

          <P.Row>
            <P.FormGroup style={{ position: 'relative' }}>
              <P.Label>Address</P.Label>
              <P.TextFieldWithIcon>
                <TextField
                  bordered
                  hasError={!!errors.address}
                  placeholder="House no., Street name, Barangay, Subdivision/Village,Province and City"
                  value={formFields.address}
                  onBlur={e =>
                    this._onBlurAddress(travellerIndex, 'address', e.target.value)
                  }
                  onFocus={(e) => this.openToggle(e)}
                />
                <span
                  href="#"
                  id="addressIcon"
                  className="icon"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 20 20"
                  >
                    <g
                      id="Group_19"
                      data-name="Group 19"
                      transform="translate(-182 -155)"
                    >
                      <g
                        id="Ellipse_1"
                        data-name="Ellipse 1"
                        transform="translate(183 155)"
                        fill="#3a3fd8"
                        stroke="#3a3fd8"
                        strokeWidth="1"
                      >
                        <circle cx="6.5" cy="6.5" r="6.5" stroke="none" />
                        <circle cx="6.5" cy="6.5" r="6" fill="none" />
                      </g>
                      <text
                        id="i"
                        transform="translate(188 165)"
                        fill="#fff"
                        fontSize="10"
                        fontFamily="SourceSansPro-Bold, Source Sans Pro"
                        fontWeight="700"
                      >
                        <tspan x="0" y="0">
                          i
                        </tspan>
                      </text>
                    </g>
                  </svg>
                </span>
              <P.Tooltip placement="bottom-end" isOpen={tooltipOpen} target="addressIcon" toggle={this.toggleToolTip}>
                {toolTipText.address}
              </P.Tooltip>
              </P.TextFieldWithIcon>
              {errors.address && (
                <P.ErrorMessage className="error-message">
                  {errors.address}
                </P.ErrorMessage>
              )}
            </P.FormGroup>
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

AdultForm.propTypes = {
  travellerIndex: PropTypes.number,
  travellerInfo: PropTypes.object,
  onBlurTraveller: PropTypes.func,
  onBlurTravellerBeneficiary: PropTypes.func,
  toolTipText: PropTypes.object
};

export default AdultForm;
