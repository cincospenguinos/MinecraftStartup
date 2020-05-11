import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function SignUpButton(props) {
  const className = props.enabled ? styles.button : styles.disabled;

  return (<button
    className={className}
    disabled={!props.enabled}
    onClick={() => props.onClick()}
    role="button"
  >
    Sign Up
  </button>);
}

SignUpButton.propTypes = {
  enabled: PropTypes.bool,
  onClick: PropTypes.func,
};

SignUpButton.defaultProps = {
  enabled: true,
  onClick: () => {},
};