import React from 'react';
import ReactDOM from 'react-dom';
import StartupOrSignUp from "../components/signup_app/startup-or-signup";
import styles from '../components/signup_app/sign-up-dialog/styles.module.css';
import SignUpInterface from "../components/signup_app/sign-up-interface/sign-up-interface";
import StartupInterface from "../components/signup_app/startup-interface/startup-interface";

document.addEventListener('DOMContentLoaded', () => {
  const csrfToken = document.getElementById('csrf-token').getAttribute('data-csrf-token');
  SignUpInterface.setCSRFToken(csrfToken);
  StartupInterface.setCSRFToken(csrfToken);

  const container = document.createElement('div');
  container.className = styles['super-container'];

  ReactDOM.render(<StartupOrSignUp />,
    document.body.appendChild(container));
});
