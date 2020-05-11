import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ValidatedInputField from "../validated-input-field/validated-input-field";
import ActionButton from "../action-button/action-button";

export default function StartupDialog(props) {
  const [isReady, setIsReady] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsReady(!!emailAddress && !!password);
  }, [emailAddress, password]);

  return (
    <React.Fragment>
      <ValidatedInputField
        id="email-address"
        label="Email Address"
        onChange={(val) => setEmailAddress(val)}
        type="email"
      />
      <ValidatedInputField
        id="password"
        label="Password"
        onChange={(val) => setPassword(val)}
        type="password"
      />
      <ActionButton
        enabled={isReady}
        label="Start"
        onClick={() => props.onSave()}
      />
   </React.Fragment>
  );
}

StartupDialog.propTypes = {
  onSave: PropTypes.func,
};

StartupDialog.defaultProps = {
  onSave: () => {},
};