import React from 'react';
import PropTypes from 'prop-types';

export default function ValidatedInputField(props) {
  const onChange = (event) => {
    const { value } = event.target;
    props.isValid(value);
  }

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        onChange={onChange}
        type="text"
      />
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