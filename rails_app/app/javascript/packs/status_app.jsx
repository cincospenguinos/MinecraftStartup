import React from 'react';
import ReactDOM from 'react-dom';
import StatusApp from './status_app/status-app';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('status-container');
  ReactDOM.render(<StatusApp />, container);
});