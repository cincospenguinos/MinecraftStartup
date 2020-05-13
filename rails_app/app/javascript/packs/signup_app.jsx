import React from 'react';
import ReactDOM from 'react-dom';
import StartupOrSignUp from "./signup_app/startup-or-signup";
import styles from './signup_app/sign-up-dialog/styles.module.css';
import SignUpInterface from "./signup_app/sign-up-interface/sign-up-interface";

document.addEventListener('DOMContentLoaded', () => {
  const csrfToken = document.getElementById('csrf-token').getAttribute('data-csrf-token');
  SignUpInterface.setCSRFToken(csrfToken);

  const container = document.createElement('div');
  container.className = styles['super-container'];

  ReactDOM.render(<StartupOrSignUp />,
    document.body.appendChild(container));
});
