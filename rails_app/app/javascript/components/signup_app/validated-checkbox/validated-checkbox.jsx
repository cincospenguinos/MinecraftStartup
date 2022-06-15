import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ValidatedCheckbox(props) {
	const [isChecked, setIsChecked] = useState(props.value);

	const onChange = (event) => {
		const newValue = !isChecked;
		setIsChecked(newValue);
		props.onChange(newValue);
	}

	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				id={props.id}
				type="checkbox"
				checked={isChecked}
				onChange={onChange}
			/>
		</div>
	);
}

ValidatedCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	value: PropTypes.bool,
};

ValidatedCheckbox.defaultProps = {
	onChange: () => {},
	value: false,
};
