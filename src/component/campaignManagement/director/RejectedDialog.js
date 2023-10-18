import React from 'react';
import { Modal } from 'antd';
import RejectEllipse from '../../../assets/images/RejectEllipse.svg';
import RejectEllipseerror from '../../../assets/images/RejectEllipseerror.png';

const RejectedDialog = ({ handleClose, isOpen, handleConfirm, handleReason, value }) => {
	return (
		<Modal open={isOpen} onCancel={handleClose} width={421} footer={null}>
			<div className="director-Dialog-wrapper">
				<div className="img-wrapper">
					<img className="rejectmImage" src={RejectEllipse} />
					<img className="rejectErrormImage" src={RejectEllipseerror} />
				</div>
				<h1>Are you sure you want to reject?</h1>
				<label>Reason</label>
				<textarea
					placeholder="Please type here reason to reject campaign"
					value={value}
					onChange={handleReason}
				></textarea>
				<div className="dialogBtn-wrapper">
					<button className="cancel-btn" onClick={handleClose}>
						Cancel
					</button>
					<button className="confirm-btn" onClick={handleConfirm}>
						Confirm
					</button>
				</div>
			</div>
		</Modal>
	);
};
export default RejectedDialog;
