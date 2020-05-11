import React, {useEffect, useState} from 'react'
import ValidatedInputField from "./validated-input-field/validated-input-field";
import * as validations from "./validations";
import styles from './styles.module.css';
import SignUpButton from "./sign-up-button/sign-up-button";

export default function SignupApp() {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    const errors = validations.default.name(name)
      .concat(validations.default.password(password))
      .concat(validations.default.passwordConfirmation(confirmPassword, password))
      .concat(validations.default.email(emailAddress));

    setCanSave(errors.length === 0);
  }, [name, emailAddress, password, confirmPassword]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Signup</h2>
      <ValidatedInputField
        id="name"
        isValid={validations.default.name}
        label="Name"
        onChange={val => setName(val)}
      />
      <ValidatedInputField
        id="email-address"
        isValid={validations.default.email}
        label="Email Address"
        onChange={val => setEmailAddress(val)}
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
        isValid={val => validations.default.passwordConfirmation(val, password)}
        label="Confirm Password"
        onChange={val => setConfirmPassword(val)}
      />
      <SignUpButton enabled={canSave} />
    </div>
  );
}