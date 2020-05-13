import React from 'react';
import td from 'testdouble';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SignUpDialog from './sign-up-dialog';

describe('app/javascript/packs/signup_app/sign-up-dialog', () => {
  const renderComponent = (props = {}) => render(<SignUpDialog {...props} />);

  afterEach(() => {
    td.reset();
    cleanup();
  });

  describe('when the user supplies a password and password confirmation', () => {
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

  describe('onSave listener', () => {
    it('calls with sign-up when successful', async () => {
      const signUpInterface = { submit: () => Promise.resolve({ errors: {} }) };
      const onSave = td.func();
      const { getByLabelText, getByRole } = renderComponent({ onSave, signUpInterface });

      fireEvent.change(getByLabelText('Name'), { target: { value: 'Joe Blow' } });
      fireEvent.change(getByLabelText('Email Address'), { target: { value: 'joe@blow.com' } });
      fireEvent.change(getByLabelText('Password'), { target: { value: 'password' }});
      fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' }});
      await fireEvent.click(getByRole('button'));

      td.verify(onSave('sign-up'));
    });

    it('does not get called when unsuccessful', async () => {
      const failedRequest = Promise.resolve({ errors: { password: ['password is not cool enough'] } });
      const signUpInterface = { submit: () => failedRequest };
      const onSave = td.func();
      const { getByLabelText, getByRole } = renderComponent({ onSave, signUpInterface });

      fireEvent.change(getByLabelText('Name'), { target: { value: 'Joe Blow' } });
      fireEvent.change(getByLabelText('Email Address'), { target: { value: 'joe@blow.com' } });
      fireEvent.change(getByLabelText('Password'), { target: { value: 'password' }});
      fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' }});
      await fireEvent.click(getByRole('button'));

      td.verify(onSave('sign-up'), { times: 0 });
    });
  });
});