import React from 'react'
import ReactDOM from 'react-dom'
import ValidatedInputField from "./signup_app/validated-input-field/validated-input-field";
import * as validations from "./signup_app/validations";
import styles from './styles.module.css';

function SignupApp() {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Signup</h2>
      <ValidatedInputField
        label="Name"
        id="name"
        isValid={validations.default.name}
      />
      <ValidatedInputField
        label="Email Address"
        id="email-address"
        type="email"
      />
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.className = styles['super-container'];

  ReactDOM.render(<SignupApp />,
    document.body.appendChild(container));
});
