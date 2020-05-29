import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ValidationErrors from "./errors/errors";
import styles from './styles.module.css';

export default function ValidatedInputField(props) {
  const [errors, setErrors] = useState([]);

  const onChange = (event) => {
    const { value } = event.target;
    const errors = props.isValid(value);
    setErrors(errors);
    props.onChange(value);
  }

  const showErrors = errors.length > 0;
  const inputClassName = showErrors ? styles.error : styles.input;
  const labelClassName = showErrors ? styles['label-error'] : styles.label;

  return (
    <div className={styles.container}>
      <label className={labelClassName} htmlFor={props.id}>{props.label}</label>
      <input
        className={inputClassName}
        id={props.id}
        onChange={onChange}
        type={props.type}
      />
      { showErrors && <ValidationErrors errors={errors} /> }
    </div>
  );
}

ValidatedInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  isValid: PropTypes.func,
  type: PropTypes.oneOf(['text', 'email', 'password'])
};

ValidatedInputField.defaultProps = {
  onChange: () => {},
  isValid: () => [],
  type: 'text',
};