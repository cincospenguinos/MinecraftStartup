import React, {useState} from 'react';
import SignUpDialog from "./sign-up-dialog/sign-up-dialog";
import styles from "./sign-up-dialog/styles.module.css";
import StartupDialog from "./startup-dialog/startup-dialog";

const internalProps = {
  startup: {
    dialog: () => <StartupDialog />,
    header: 'Start the Server',
    onClick: (setCurrentDialog) => setCurrentDialog('signUp'),
    toggleText: "Haven't joined?",
  },
  signUp: {
    dialog: () => <SignUpDialog />,
    header: 'Sign Up',
    onClick: (setCurrentDialog) => setCurrentDialog('startup'),
    toggleText: "Already a member?",
  },
};

export default function StartupOrSignUp() {
  const [currentDialog, setCurrentDialog] = useState('startup');
  const props = internalProps[currentDialog];

  return (
    <div className={styles.container}>
      <div className={styles['head-container']}>
        <h2 className={styles.header}>{props.header}</h2>
        <a className={styles.toggle} onClick={() => props.onClick(setCurrentDialog)}>{props.toggleText}</a>
      </div>
      { props.dialog() }
    </div>
  );
}