import React from 'react';

const Button = ({ label, className, handleClick, disabled }) => {
	return (
		<>
			<button className={className} onClick={handleClick} disabled={disabled}>
				{label}
			</button>
		</>
	);
};
export default Button;
