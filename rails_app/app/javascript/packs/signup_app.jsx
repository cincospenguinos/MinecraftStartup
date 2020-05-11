import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import ValidatedInputField from "./signup_app/validated-input-field/validated-input-field";
import * as validations from "./signup_app/validations";
import styles from './styles.module.css';

export default function SignupApp() {
  const [password, setPassword] = useState();

  const confirmationValidation = (value) => {
    const errors = validations.default.password(value);

    if (value !== password) {
      errors.push('Password and password confirmation must match');
    }

    return errors;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Signup</h2>
      <ValidatedInputField
        id="name"
        isValid={validations.default.name}
        label="Name"
      />
      <ValidatedInputField
        id="email-address"
        isValid={validations.default.email}
        label="Email Address"
        type="email"
      />
      <ValidatedInputField
        id="password"
        isValid={validations.default.password}
        label="Password"
        onChange={val => setPassword(val)}
        type="password"
      />
      <ValidatedInputField
        id="confirm-password"
        type="password"
        label="Confirm Password"
        isValid={confirmationValidation}
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
