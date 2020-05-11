import React from 'react';
import td from 'testdouble';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SignUpDialog from "./sign-up-dialog";

describe('app/javascript/packs/signup_app/sign-up-dialog', () => {
  const renderComponent = (props = {}) => render(<SignUpDialog {...props} />);

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

  it('accepts an onSave listener', () => {
    const onSave = td.func();
    const { getByLabelText, getByRole } = renderComponent({ onSave });

    fireEvent.change(getByLabelText('Name'), { target: { value: 'Joe Blow' } });
    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'joe@blow.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' }});
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' }});
    fireEvent.click(getByRole('button'));

    td.verify(onSave());
  });
});