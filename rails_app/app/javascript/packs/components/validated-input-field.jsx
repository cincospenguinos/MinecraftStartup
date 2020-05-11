import React from 'react';
import PropTypes from 'prop-types';

export default function ValidatedInputField(props) {
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type="text" />
        </div>
    );
}

ValidatedInputField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};