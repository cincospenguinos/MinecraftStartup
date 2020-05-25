import React, {useState} from 'react';
import SignUpDialog from "./sign-up-dialog/sign-up-dialog";
import styles from "./sign-up-dialog/styles.module.css";
import StartupDialog from "./startup-dialog/startup-dialog";
import ErrorInSignUp from './error-in-sign-up/error-in-sign-up';
import PropTypes from "prop-types";

const internalProps = {
  startup: {
    dialog: (onClick, _) => <StartupDialog onClick={onClick} />,
    header: 'Start the Server',
    onToggleClick: (setCurrentDialog) => setCurrentDialog('signUp'),
    toggleText: "Haven't joined?",
  },
  signUp: {
    dialog: (onSave, { signUpInterface }) => <SignUpDialog onSave={onSave} signUpInterface={signUpInterface} />,
    header: 'Sign Up',
    onToggleClick: (setCurrentDialog) => setCurrentDialog('startup'),
    toggleText: 'Already a member?',
  },
  signUpComplete: {
    dialog: () => <p>You will receive an email when Andre approves adding you to the server.</p>,
    header: 'Sign Up Complete!',
    onToggleClick: (_) => {},
    toggleText: '',
  },
  signUpError: {
    dialog: (_, opts) => <ErrorInSignUp errors={opts.errors} />,
    header: 'Errors during sign up!',
    toggleText: '',
  }
};

export default function StartupOrSignUp({ signUpInterface }) {
  const [currentDialog, setCurrentDialog] = useState('startup');
  const [opts, setOpts] = useState({});

  const props = internalProps[currentDialog];
  const onSave = (nextState, opts = {}) => {
    debugger;
    setCurrentDialog(nextState);
    setOpts(opts);
  };

  return (
    <div className={styles.container}>
      <div className={styles['head-container']}>
        <h2 className={styles.header}>{props.header}</h2>
        <a className={styles.toggle} onClick={() => props.onToggleClick(setCurrentDialog)}>{props.toggleText}</a>
      </div>
      { props.dialog(onSave, { signUpInterface, ...opts }) }
    </div>
  );
}

StartupDialog.propTypes = {
  signUpInterface: PropTypes.shape({ submit: PropTypes.func.isRequired }),
};

StartupDialog.defaultProps = {
  signUpInterface: undefined,
};
