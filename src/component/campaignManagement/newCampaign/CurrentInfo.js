import React from 'react';
import CaretLeft from '../../../assets/images/CaretLeft.svg';
import CaretRight from '../../../assets/images/CaretRight.svg';

const Currentinfo = ({ handleBack, label, handlePrev, previous, next }) => {
	return (
		<div className="current-info-wrapper">
			<div className="main-heading">
				<img onClick={handleBack} src={CaretLeft} />
				<h1>{label}</h1>
			</div>
			<div className="heading-tab">
				<p onClick={handlePrev}>{previous}</p>
				<img src={CaretRight} />
				<p>{next}</p>
			</div>
		</div>
	);
};

export default Currentinfo;
