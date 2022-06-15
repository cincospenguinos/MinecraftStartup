import React from 'react';
import td, { when } from 'testdouble';
import { render, fireEvent, cleanup } from "@testing-library/react";
import ValidatedCheckbox from "./validated-checkbox";

describe('app/javascript/packs/signup_app/validated-input-field', () => {
	const renderComponent = (props = {}) => render(<ValidatedCheckbox id="foo" label="bar" {...props} />);

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
     expect(getByLabelText('bar').getAttribute('id')).toBe('yo');
   });
  });

  describe('value API', () => {
  	it('accepts a boolean', () => {
  		const { getByLabelText } = renderComponent({ value: true });
  		expect(getByLabelText('bar').getAttribute('checked')).toBe('');
  	});
  });

  describe('onChange API', () => {
    it('accepts an onChange listener', () => {
    	const onChange = td.func();
    	const { getByLabelText } = renderComponent({ onChange });
      fireEvent.click(getByLabelText('bar'));
      td.verify(onChange(true));

      fireEvent.click(getByLabelText('bar'));
      td.verify(onChange(false))
    });
  });
});