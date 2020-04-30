import React from 'react';
import { shallow } from 'enzyme';
import { ParkingLot } from '../parking-lot';
import { IParkingLot } from '../parking-lot.model';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

const history = createMemoryHistory();
const path = `/lot`;
const fakeMatch: match = {
  isExact: false,
  path,
  url: path,
  params: {},
};
const location = createLocation(fakeMatch.url);

const getParkingLotsDummy = () => null;

const baseParkingLot = {
  id: 1,
  name: 'Foo',
  address: 'Bar',
  spots: 100,
  status: {
    carCount: 10,
  },
} as IParkingLot;

const baseProps = {
  parkingLots: [baseParkingLot],
  loading: false,
  getParkingLots: getParkingLotsDummy,
  location,
  match: fakeMatch,
  history,
};

let mountedWrapper = null;
const wrapper = (props = baseProps) => {
  if (!mountedWrapper) {
    mountedWrapper = shallow(<ParkingLot {...props} />);
  }
  return mountedWrapper;
};

describe('<ParkingLot />', () => {
  it('Renders the component that matches the snapshot', () => {
    const component = wrapper();
    expect(component).toMatchSnapshot();
  });
});
