import React from 'react';
import renderer from 'react-test-renderer';
import configuredMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

import { TestProvider } from '../../../utils/testUtils';
import initialState from '../../../reducers/initialState';
import '../../../../tools/setupEnzyme';

import TravelInsurancePage from '../TravelInsurancePage';

const getState = () => Object.assign({}, initialState);
const store = configuredMockStore()(getState());

describe('Travel Insurance page', () => {
  it('renders correctly', () => {

    const container = renderer.create(
      <TestProvider store={store}>
        <TravelInsurancePage />
      </TestProvider>
    );

    expect(container).toMatchSnapshot();
  });
});