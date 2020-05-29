import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ErrorInSignUp from "./error-in-sign-up";

describe('app/javascript/packs/signup_app/error-in-sign-up/error-in-sign-up', () => {
  const renderComponent = (props = {}) => render(<ErrorInSignUp {...props} />);
  afterEach(cleanup);

  it('displays provided errors', () => {
    const errors = { emailAddress: ['is lame'], name: ['is long', 'is short'] };
    const { getByText } = renderComponent({ errors });
    expect(getByText('emailAddress is lame')).toBeDefined();
    expect(getByText('name is long')).toBeDefined();
    expect(getByText('name is short')).toBeDefined();
  });
});