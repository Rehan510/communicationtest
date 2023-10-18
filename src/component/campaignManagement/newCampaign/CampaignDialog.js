import React from 'react';
import { Modal } from 'antd';
import confirmModalEllipse from '../../../assets/images/confirmModalEllipse.svg';
import check_mark from '../../../assets/images/check_mark.png';

const CampaignDialog = ({ heading, content, CloseBtn, isShowPopup }) => {
	return (
		<Modal open={isShowPopup} onCancel={CloseBtn} width={348} footer={null}>
			<div className="Dialog-wrapper">
				<div className="img-wrapper">
					<img className="confirmImage" src={confirmModalEllipse} />
					<img src={check_mark} />
				</div>
				<h1>{heading}</h1>
				<p>{content}</p>
				<button onClick={CloseBtn}>CLOSE</button>
			</div>
		</Modal>
	);
};
export default CampaignDialog;
