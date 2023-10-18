import React from 'react';
import { getFileName } from '../../../utils/helpers';
const Campaigndetails = ({
	campaignType,
	campaignName,
	messageType,
	time,
	startDate,
	endDate,
	base,
	msg,
	file,
	frequency
}) => {
	return (
		<div className="campaign-Details">
			<div className="deatils">
				<li>
					<label>Campaign Type</label>
					<span>{campaignType}</span>
				</li>
				<li>
					<label>Campaign Name</label>
					<span>{campaignName} </span>
				</li>
				<li>
					<label>Message Type</label>
					<span>{messageType}</span>
				</li>

				{startDate && (
					<li>
						<label>Starting Date</label>
						<span>{startDate}</span>
					</li>
				)}

				{endDate && (
					<li>
						<label>Ending Date</label>
						<span>{endDate}</span>
					</li>
				)}

				{time && (
					<li>
						<label>Time</label>
						<span>{time}</span>
					</li>
				)}
				{frequency.length > 0 && (
					<li>
						<label>Frequency</label>
						<span> {frequency.map((v) => v.label + ',')}</span>
					</li>
				)}

				<li>
					<label>Base</label>
					<span>{base}</span>
				</li>
				<span className="media-file">
					{file && (
						<li>
							<p title={file}>{getFileName(file)}</p>{' '}
						</li>
					)}
				</span>

				<li>
					<label>Message</label>
					<span>{msg}</span>
				</li>
			</div>
		</div>
	);
};

export default Campaigndetails;
