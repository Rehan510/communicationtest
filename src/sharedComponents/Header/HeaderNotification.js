import React, { useEffect } from 'react';
import { Button, Popover } from 'antd';
import { Divider } from 'antd';
import IconBell from '../../assets/images/icon-bell.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignView } from '../../reducers/communication';
import notiImage from '../../assets/images/notiImage.png';
import { get } from 'lodash';
import { getNotifications } from '../../component/campaignManagement/globleActions';
import axios from 'axios';
import dayjs from 'dayjs';

const HeaderNotification = () => {
	const dispatch = useDispatch();
	const { notifications } = useSelector((state) => state.communicationSlice);
	const handleNotification = () => {
		dispatch(setCampaignView('notification'));
	};
	useEffect(() => {
		dispatch(getNotifications());
	}, [dispatch]);

	const isRead = (element) => !element.isRead;
	const readNotification = async () => {
		if (notifications.some(isRead)) {
			try {
				const resp = await axios.patch('/campaign/read-notification', {});
				const error = get(resp, 'data.error', true);
				if (!error) {
					dispatch(getNotifications());
				}
			} catch (error) {
				console.log(error, 'Error');
			}
		}
	};
	const content = (
		<div className="main-noti">
			<h1>Notifications</h1>
			{notifications.map((notification, index) => {
				return (
					index < 3 && (
						<div key={`notiii${index}`} className="noti-item">
							<span className="img-wrap">
								<img src={notiImage} alt="image here" />
							</span>
							<div className="noti-detail">
								<p>{get(notification, 'message', '')}</p>
								<div className="noti-datetime">
									<span>{dayjs(get(notification, 'createdDateTime', Date.now())).format('dddd hh:mma')}</span>
									<span>{dayjs(get(notification, 'createdDateTime', Date.now())).format('MMM DD, YYYY')}</span>
								</div>
								<Divider />
							</div>
						</div>
					)
				);
			})}
			<div className="noti-actions">
				<a
					className="mark-read"
					href
					onClick={() => {
						readNotification();
					}}
				>
					Mark all as read
				</a>
				<Button className="noti-btn" onClick={() => handleNotification()}>
					View all notifications
				</Button>
			</div>
		</div>
	);
	return (
		<>
			<Popover content={content} placement="bottomRight">
				<span className={`icon-wrap ${notifications.some(isRead) && 'new-noti'}`}>
					<img src={IconBell} />
				</span>
			</Popover>
		</>
	);
};
export default HeaderNotification;
