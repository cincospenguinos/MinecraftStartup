import React from 'react';
import { render, cleanup } from "@testing-library/react";
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
});