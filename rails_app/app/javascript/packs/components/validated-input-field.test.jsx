import React from 'react';
import td from 'testdouble';
import { render, fireEvent, cleanup } from "@testing-library/react";
import ValidatedInputField from "./validated-input-field";

describe('app/javascript/packs/components/validated-input-field', () => {
   const renderComponent = (props = {}) =>  render(<ValidatedInputField id="foo" label="Some label" {...props} />);

   afterEach(cleanup);

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
       const { getByLabelText } = renderComponent({ isValid });
       fireEvent.change(getByLabelText('Some label'), { target: { value: 'foo' } });

       td.verify(isValid('foo'));
     });
   });
});