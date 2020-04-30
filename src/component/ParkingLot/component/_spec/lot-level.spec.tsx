import React from 'react';
import { shallow } from 'enzyme';
import { LotLevel } from '../lot-level';

const baseProps = {
  total: 100,
  count: 10,
};

let mountedWrapper = undefined;
const wrapper = (props = baseProps) => {
  if (!mountedWrapper) {
    mountedWrapper = shallow(<LotLevel {...props} />);
  }
  return mountedWrapper;
};

beforeEach(() => {
  mountedWrapper = undefined;
});

describe('<LotLevel />', () => {
  it('Renders the component to match the snapshot', () => {
    const component = wrapper();

    expect(component).toMatchSnapshot();
  });

  it('Become red when count is more than EMERGENCY_LEVEL', () => {
    const component = wrapper({
      ...baseProps,
      count: 90,
    });

    expect(component.find('#lot-level-box').hasClass(/lotLevelEmergency/)).toBe(true);
  });

  it('Become red when count is equals to EMERGENCY_LEVEL', () => {
    const component = wrapper({
      ...baseProps,
      count: 80,
    });

    expect(component.find('#lot-level-box').hasClass(/lotLevelEmergency/)).toBe(true);
  });

  it('Become red when count is equals to EMERGENCY_LEVEL', () => {
    const component = wrapper({
      ...baseProps,
      count: 10,
    });

    expect(component.find('#lot-level-box').hasClass(/lotLevelEmergency/)).toBe(false);
  });
});
