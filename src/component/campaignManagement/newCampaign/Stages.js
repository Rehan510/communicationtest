import React from 'react';
import AddDetail from './Detail';
import AddMessage from './AddMessage';
import Confrim from './Confirmation';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { ADD_MESSAGE, ADD_DETAIL, CONFIRMATION } from '../../../config/campaginStagesCodes';
const Stages = () => {
	const { campaignStep } = useSelector((state) => state.communicationSlice);

	const createCampaignStep = {
		1: <AddDetail />,
		2: <AddMessage />,
		3: <Confrim />
	};
	const steps = [
		{ title: 'Add Details', step: ADD_DETAIL },
		{ title: 'Add Message', step: ADD_MESSAGE },
		{ title: 'Confirmation', step: CONFIRMATION }
	];
	const getClass = (dd) => {
		let data = dd.step === campaignStep ? 'current-step' : 'next-step';
		if (dd.step < campaignStep) {
			data = 'complete-step';
		}
		return data;
	};
	return (
		<div>
			<div className="stages-wrapper">
				{steps.map((st, index) => {
					return (
						<React.Fragment key={`steps${index}`}>
							<div className={getClass(st)}>
								<span>0{index + 1}</span>
								<p>{st.title}</p>
							</div>
						</React.Fragment>
					);
				})}
			</div>
			<section className="details-wrapper">{get(createCampaignStep, campaignStep, null)}</section>
		</div>
	);
};

export default Stages;
