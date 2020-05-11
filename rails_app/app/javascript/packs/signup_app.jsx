import React from 'react';
import ReactDOM from 'react-dom';
import SignupApp from "./signup_app/signup-app";
import styles from './signup_app/styles.module.css';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.className = styles['super-container'];

  ReactDOM.render(<SignupApp />,
    document.body.appendChild(container));
});
