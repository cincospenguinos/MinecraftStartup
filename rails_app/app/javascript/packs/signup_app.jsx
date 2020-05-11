import React from 'react';
import ReactDOM from 'react-dom';
import StartupOrSignUp from "./signup_app/startup-or-signup";
import styles from './signup_app/sign-up-dialog/styles.module.css';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.className = styles['super-container'];

  ReactDOM.render(<StartupOrSignUp />,
    document.body.appendChild(container));
});
