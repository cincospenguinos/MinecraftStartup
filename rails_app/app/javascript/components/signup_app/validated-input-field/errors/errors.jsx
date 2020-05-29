import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Errors(props) {
  return (<ul className={styles.container}>
    { props.errors.map(e => <li className={styles.error} key={e}>{e}</li>) }
  </ul>);
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
}

Errors.defaultProps = {
  errors: [],
}