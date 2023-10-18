import React from 'react';
import { Modal } from 'antd';
import RejectEllipse from '../../../assets/images/RejectEllipse.svg';
import RejectEllipseerror from '../../../assets/images/RejectEllipseerror.png';

const ApproveDialog = ({ isOpen, handleClose, handleConfirm }) => {
	return (
		<Modal open={isOpen} onCancel={handleClose} width={421} footer={null}>
			<div className="director-Dialog-wrapper">
				<div className="img-wrapper">
					<img className="rejectmImage" src={RejectEllipse} />
					<img className="rejectErrormImage" src={RejectEllipseerror} />
				</div>
				<h1>Are you sure you want to Approve?</h1>

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
export default ApproveDialog;
