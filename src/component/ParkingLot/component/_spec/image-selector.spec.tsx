import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import { ImageSelector } from '../image-selector';

const setImageUrlSpy = sinon.spy();

const baseProps = {
  setImageUrl: setImageUrlSpy,
};

const wrapper = (props = baseProps) => {
  return shallow(<ImageSelector {...props} />);
};

beforeEach(() => {
  setImageUrlSpy.resetHistory();
});

describe('<ImageSelector />', () => {
  it('Renders the component to match the snapshot', () => {
    const component = wrapper();

    expect(component).toMatchSnapshot();
  });

  it('Should get a new imagee everytime image container is clicked', async () => {
    const IMAGE_URL = 'http://example.com/image.jpg';
    axios.get = sinon.stub().returns(
      Promise.resolve({
        request: {
          responseUrl: IMAGE_URL,
        },
      })
    );

    const component = wrapper();

    await component.find('#image-selector-box').simulate('click');

    expect(setImageUrlSpy.calledOnce).toBe(true);
  });
});
