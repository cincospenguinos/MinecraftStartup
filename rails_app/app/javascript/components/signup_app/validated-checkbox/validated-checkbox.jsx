import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function ValidatedCheckbox(props) {
	const [isChecked, setIsChecked] = useState(props.value);

	const onChange = (event) => {
		const newValue = !isChecked;
		setIsChecked(newValue);
		props.onChange(newValue);
	}

	return (
		<div className={styles.container}>
			<input
				className={styles.input}
				id={props.id}
				type="checkbox"
				checked={isChecked}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor={props.id}>{props.label}</label>
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
