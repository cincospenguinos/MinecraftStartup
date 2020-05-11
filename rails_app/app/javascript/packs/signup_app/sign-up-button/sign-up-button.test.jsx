import React from 'react';
import td from 'testdouble';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SignUpButton from "./sign-up-button";

describe('app/javascript/packs/signup_app/sign-up-button/sign-up-button', () => {
  const renderComponent = (props = {}) => render(<SignUpButton {...props} />);

  afterEach(cleanup);

  describe('onClick API', () => {
    it('accepts an onClick listener', () => {
      const onClick = td.func();
      const { getByRole } = renderComponent({ onClick });
      fireEvent.click(getByRole('button'));

      td.verify(onClick());
    });
  });

  describe('enabled API', () => {
    it('can be disabled', () => {
      const { getByRole } = renderComponent({ enabled: false });
      expect(getByRole('button').getAttribute('disabled')).toEqual('');
    });

    it('can be enabled', () => {
      const { getByRole } = renderComponent({ enabled: true });
      expect(getByRole('button').getAttribute('disabled')).not.toEqual('');
    });
  });
});