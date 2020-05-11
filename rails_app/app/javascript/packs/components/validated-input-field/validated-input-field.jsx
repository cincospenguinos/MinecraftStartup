import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function ValidatedInputField(props) {
  const [errors, setErrors] = useState([]);

  const onChange = (event) => {
    const { value } = event.target;
    const errors = props.isValid(value);
    setErrors(errors);
  }

  const errorsToShow = () => {
    return (<ul>
      { errors.map(e => <li key={e}>{e}</li>) }
    </ul>);
  };

  const showErrors = errors.length > 0;

  return (
    <div className={styles.container}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className={styles.input}
        id={props.id}
        onChange={onChange}
        type="text"
      />
      { showErrors && errorsToShow() }
    </div>
  );
}

ValidatedInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isValid: PropTypes.func,
};

ValidatedInputField.defaultProps = {
  isValid: () => {},
};