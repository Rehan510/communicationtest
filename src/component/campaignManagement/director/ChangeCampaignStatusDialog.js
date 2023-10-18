import React from 'react';
import { Modal } from 'antd';

const ChangeCampaignStatusDialog = ({ isOpen, handleClose, handleCampaignStatus }) => {
	return (
		<Modal open={isOpen} onCancel={handleClose} width={343} footer={null}>
			<div className="director-Dialog-wrapper ">
				<h1 className="changeStatus">Set Campaign Status</h1>
				<p>Please set status of approved campaign.</p>
				<div className="dialogBtn-wrapper">
					<button className="cancel-btn" onClick={() => handleCampaignStatus('inActive')}>
						Inactive
					</button>
					<button className="confirm-btn" onClick={() => handleCampaignStatus('active')}>
						Active
					</button>
				</div>
			</div>
		</Modal>
	);
};
export default ChangeCampaignStatusDialog;
