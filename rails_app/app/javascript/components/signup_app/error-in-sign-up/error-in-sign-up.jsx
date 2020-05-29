import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorInSignUp({
  errors,
}) {
  const displayErrors = () => {
    return Object.keys(errors).map((field) => {
      const fieldErrors = errors[field];
      return fieldErrors.map(e => <li key={`${field}${e}`}>{field} {e}</li>);
    }).flat();
  };

  return (
    <div>
      <ul>
        { displayErrors() }
      </ul>
      <p>Please inform Andre of this error so it can be resolved.</p>
    </div>
  );
}

ErrorInSignUp.propTypes = {
  errors: PropTypes.object,
};

ErrorInSignUp.defaultProps = {
  errors: {},
};
