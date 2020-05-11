import React from 'react'
import ReactDOM from 'react-dom'
import ValidatedInputField from "./components/validated-input-field/validated-input-field";

function SignupApp() {
  return (
    <div>
      <ValidatedInputField label="Name" id="name" />
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SignupApp />,
    document.body.appendChild(document.createElement('div')),
  )
})
