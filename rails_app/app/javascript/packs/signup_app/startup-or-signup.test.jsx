import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import StartupOrSignUp from "./startup-or-signup";

describe('app/javascript/packs/signup_app/startup-or-signup', () => {
  const renderComponent = (props = {}) => render(<StartupOrSignUp />);

  afterEach(cleanup);

  it('toggles back and forth', () => {
    const { getByText } = renderComponent();
    expect(getByText('Start the Server')).toBeTruthy();

    fireEvent.click(getByText("Haven't joined?"));
    expect(getByText('Already a member?')).toBeTruthy();

    fireEvent.click(getByText("Already a member?"));
    expect(getByText('Start the Server')).toBeTruthy();
  });
});