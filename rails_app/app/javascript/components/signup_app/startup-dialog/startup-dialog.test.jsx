import React from 'react';
import td from 'testdouble';
import { render, cleanup, fireEvent } from '@testing-library/react';
import StartupDialog from "./startup-dialog";

describe('app/javascript/packs/signup_app/startup-dialog/startup-dialog', () => {
  const renderComponent = (props = {}) => render(<StartupDialog {...props} />);

  afterEach(() => {
    td.reset();
    cleanup();
  });

  it('disables the start button until fields are filled', () => {
    const { getByLabelText, getByRole } = renderComponent();
    expect(getByRole('button').getAttribute('disabled')).toBe('');
    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'foo@foo.foo' }});
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });

    expect(getByRole('button').getAttribute('disabled')).not.toBe('');
  });

  it('accepts an onSave listener', async () => {
    const onSave = td.func();
    const { getByLabelText, getByRole } = renderComponent({ onSave, startupInterface: null });

    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'foo@foo.foo' }});
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    expect(getByRole('button').getAttribute('disabled')).toBe(null);

    await fireEvent.click(getByRole('button'));
    td.verify(onSave('startupSuccess'));
  });
});
