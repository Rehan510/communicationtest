import React from 'react';
import Button from './Button';
const ConfirmBtn = ({ handleClick }) => {
	const btnData = [
		{ label: 'Back', className: 'back-btn', key: 'back' },
		{ label: 'Cancel', className: 'cancel-btn', key: 'cancel' },
		{ label: 'Save as Drafts', className: 'save-btn', key: 'draft' },
		{ label: 'Submit for Approval', className: 'submit-btn', key: 'submit' }
	];
	const handleSub = (btn) => {
		handleClick(btn);
	};
	return (
		<div className="confirmBtn-wrapper">
			<div className="confirm-btn">
				{btnData.map((btn) => {
					return (
						<Button
							key={btn['key']}
							label={btn['label']}
							className={btn['className']}
							keyData={btn['key']}
							handleClick={() => handleSub(btn)}
						/>
					);
				})}
			</div>
		</div>
	);
};
export default ConfirmBtn;
