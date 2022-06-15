import React from 'react';
import td, { when } from 'testdouble';
import { render, fireEvent, cleanup } from "@testing-library/react";
import ValidatedInputField from "./validated-input-field";

describe('app/javascript/packs/signup_app/validated-input-field', () => {
   const renderComponent = (props = {}) =>  render(<ValidatedInputField id="foo" label="Some label" {...props} />);

  afterEach(() => {
    td.reset();
    cleanup();
  });

  describe('label API', () => {
    it('takes a label', () => {
        const { getByLabelText } = renderComponent({ label: 'FOO' });
        expect(getByLabelText('FOO')).toBeDefined();
    });
  });

  describe('id API', () => {
   it('takes an ID', () => {
     const { getByLabelText } = renderComponent({ id: 'yo' });
     expect(getByLabelText('Some label').getAttribute('id')).toBe('yo');
   });
  });

  describe('valdiation API', () => {
   it('validates its input with a provided function', () => {
     const isValid = td.func();
     when(isValid(td.matchers.anything())).thenReturn([]);
     const { queryByText, getByLabelText } = renderComponent({ isValid });
     fireEvent.change(getByLabelText('Some label'), { target: { value: 'foo' } });

     expect(queryByText('bologna')).toBeFalsy();
   });

   it('presents an error when invalid', () => {
     const isValid = () => ['This is bologna'];
     const { getByText, getByLabelText } = renderComponent({ isValid });
     fireEvent.change(getByLabelText('Some label'), { target: { value: 'foo' } });

     expect(getByText('This is bologna')).toBeDefined();
   });
  });

  describe('type API', () => {
   it('uses the type provided', () => {
     const { getByLabelText } = renderComponent({ type: 'email' });
     expect(getByLabelText('Some label').getAttribute('type')).toBe('email');
   });
  });

  describe('onChange API', () => {
    it('accepts an onChange listener', () => {
      const onChange = td.func();
      const { getByLabelText } = renderComponent({ onChange });
      fireEvent.change(getByLabelText('Some label'), { target: { value: 'asdf' } });    td.verify(onChange('asdf'));
    });
  });
});