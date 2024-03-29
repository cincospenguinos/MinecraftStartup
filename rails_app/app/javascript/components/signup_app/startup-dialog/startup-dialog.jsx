import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ValidatedInputField from "../validated-input-field/validated-input-field";
import ValidatedCheckbox from "../validated-checkbox/validated-checkbox";
import ActionButton from "../action-button/action-button";
import StartupInterface from "../startup-interface/startup-interface";

export default function StartupDialog(props) {
  const [isReady, setIsReady] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotify] = useState(false);
  const startupInterface = props.startupInterface || new StartupInterface();

  useEffect(() => {
    setIsReady(!!emailAddress && !!password);
  }, [emailAddress, password]);

  const submitRequest = async () => {
    if (startupInterface) {
      const response = await startupInterface.submit({ emailAddress, password, notify });
      console.log('>>> Chatting up the server...');

      if (response.errors) {
        props.onSave('startupError', response.error);
        return;
      }
    }

    props.onSave('startupSuccess');  
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
      <ValidatedCheckbox
        id="notify"
        label="Notify discord?"
        onChange={(val) => setNotify(val)}
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
  startupInterface: PropTypes.shape({ submit: PropTypes.func.isRequired }),
};

StartupDialog.defaultProps = {
  onSave: () => {},
  startupInterface: undefined,
};