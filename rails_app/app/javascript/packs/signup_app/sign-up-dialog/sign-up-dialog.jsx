import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import ValidatedInputField from "../validated-input-field/validated-input-field";
import * as validations from "./validations";
import ActionButton from "../action-button/action-button";
import SignUpInterface from "../sign-up-interface/sign-up-interface";

export default function SignUpDialog(props) {
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

  const onClick = () => {
    props.signUpInterface
      .submit({ name, emailAddress, password, confirmPassword })
      .then((response) => {
        const numberOfErrors = Object.keys(response.errors).length;

        if (numberOfErrors === 0) {
          props.onSave('signUpComplete');
        } else {
          props.onSave('signUpError', { errors: response.errors });
        }
      });
  };

  return (
    <React.Fragment>
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
      <ActionButton label="Sign Up" onClick={() => onClick()} enabled={canSave} />
    </React.Fragment>
  );
}

SignUpDialog.propTypes = {
  onSave: PropTypes.func.isRequired,
  signUpInterface: PropTypes.shape({ submit: PropTypes.func.isRequired }),
};

SignUpDialog.defaultProps = {
  signUpInterface: new SignUpInterface(),
};