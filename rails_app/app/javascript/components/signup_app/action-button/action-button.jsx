import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function ActionButton(props) {
  const className = props.enabled ? styles.button : styles.disabled;

  return (<button
    className={className}
    disabled={!props.enabled}
    onClick={() => props.onClick()}
    role="button"
  >
    {props.label}
  </button>);
}

ActionButton.propTypes = {
  enabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ActionButton.defaultProps = {
  enabled: true,
  onClick: () => {},
};