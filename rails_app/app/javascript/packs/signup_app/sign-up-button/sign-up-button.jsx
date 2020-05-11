import React from 'react';
import PropTypes from 'prop-types';

export default function SignUpButton(props) {
  return (<button
    disabled={!props.enabled}
    role="button"
    onClick={() => props.onClick()}
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