import React from 'react'
import ReactDOM from 'react-dom'
import ValidatedInputField from "./components/validated-input-field/validated-input-field";

function SignupApp() {
  const isNameValid = (value) => {
    if (!value) {
      return ['Name may not be empty'];
    }

    return [];
  };

  return (
    <div>
      <ValidatedInputField label="Name" id="name" isValid={isNameValid} />
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SignupApp />,
    document.body.appendChild(document.createElement('div')),
  )
})
