import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SignupApp from "./signup-app";

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

  it('permits saving after filling all the fields', () => {
    const { getByLabelText, getByRole } = renderComponent();
    expect(getByRole('button').getAttribute('disabled')).toBe('');

    fireEvent.change(getByLabelText('Name'), { target: { value: 'Joe Blow' } });
    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'joe@blow.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' }});
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' }});

    expect(getByRole('button').getAttribute('disabled')).not.toBe('');
  });
});