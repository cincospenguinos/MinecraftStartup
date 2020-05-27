import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Hello, world!</div>;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('status-container');
  ReactDOM.render(<App />, container);
});