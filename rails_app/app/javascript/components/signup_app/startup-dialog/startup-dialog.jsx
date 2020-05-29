import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ValidatedInputField from "../validated-input-field/validated-input-field";
import ActionButton from "../action-button/action-button";
import StartupInterface from "../startup-interface/startup-interface";

export default function StartupDialog(props) {
  const [isReady, setIsReady] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const startupInterface = new StartupInterface();

  useEffect(() => {
    setIsReady(!!emailAddress && !!password);
  }, [emailAddress, password]);

  const submitRequest = async () => {
    const response = await startupInterface.submit({ emailAddress, password });
    debugger;

    if (response.errors) {
      props.onSave('startupError', response.error);
    } else {
      props.onSave('startupSuccess');
    }
  };

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
        onClick={submitRequest}
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