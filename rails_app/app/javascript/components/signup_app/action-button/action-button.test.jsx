import React from 'react';
import td from 'testdouble';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ActionButton from "./action-button";

describe('app/javascript/packs/signup_app/action-button/action-button', () => {
  const renderComponent = (props = {}) => render(<ActionButton label="Foo" {...props} />);

  afterEach(() => {
    td.reset();
    cleanup();
  });

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

  describe('label API', () => {
    it('accepts a label', () => {
      const { getByText } = renderComponent({ label: 'Hello!' });
      expect(getByText('Hello!')).toBeTruthy();
    });
  });
});