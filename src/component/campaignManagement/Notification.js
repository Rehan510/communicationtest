import React, { useEffect } from 'react';
import CurrentInfo from './newCampaign/CurrentInfo';
import RedIcon from '../../assets/images/notificationRedIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignView } from '../../reducers/communication';
import { get } from 'lodash';
import NotificationImg from '../../assets/images/notiImage.png';
import { getNotifications } from '../../component/campaignManagement/globleActions';
import dayjs from 'dayjs';
const Notification = () => {
	const dispatch = useDispatch();
	const { notifications } = useSelector((state) => state.communicationSlice);
	const handleClick = () => {
		dispatch(setCampaignView('campaignTable'));
	};
	useEffect(() => {
		dispatch(getNotifications());
	}, [dispatch]);

	return (
		<div>
			<CurrentInfo
				handleBack={handleClick}
				label={'Notifications'}
				handlePrev={handleClick}
				previous={'Home'}
				next={'Notifications'}
			/>
			<section className="notification-wrapper">
				<h1>Notifications</h1>
				{notifications.map((notification, index) => {
					return (
						<div key={`noti${index}`} className="notication-jar">
							<div className="notification-bar">
								<span className="img-wrap">
									<img src={NotificationImg} alt="image here" />
								</span>
								<div className="notification-description">
									<div className="notification-desc">
										<span>{get(notification, 'message', null)}</span>
										<p>{dayjs(get(notification, 'createdDateTime', Date.now())).format('dddd hh:mma')}</p>
									</div>
									<span>
										<span>{dayjs(get(notification, 'createdDateTime', Date.now())).format('MMM DD, YYYY')}</span>{' '}
										{notification.isRead ? null : <img src={RedIcon} />}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default Notification;
