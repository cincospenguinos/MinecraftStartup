import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SignupApp from "./signup_app";

describe('app/javascript/packs/signup_app', () => {
  const renderComponent = (props = {}) => render(<SignupApp {...props} />);

  afterEach(cleanup);

  describe('when the user inputs passwords', () => {
    it('ensures both match each other', () => {
      const { getByLabelText, getByText } = renderComponent();
      fireEvent.change(getByLabelText('Password'), { target: { value: 'mismatch' }});
      fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'mimsatch' }});

      expect(getByText('Password and password confirmation must match')).toBeDefined();
    });
  });
});