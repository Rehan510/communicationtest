import React, { useState } from 'react';
import Search from '../../assets/images/icon-search.svg';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedCampaign, setIsPagination } from '../../reducers/campaign';
import { setCampaignView } from '../../reducers/communication';
import { CloseOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
export const HeaderSearch = () => {
	const { searchedCampaign } = useSelector((state) => state.campaignSlice);
	const [isClick, setIsClick] = useState(false);
	const [search, setSearch] = useState(searchedCampaign);
	const dispatch = useDispatch();

	const handleOnPressEnter = (v) => {
		toast.dismiss();
		if (!v.target.value) {
			toast.error('Please enter campaign name');
			return;
		}
		dispatch(setIsPagination(false));
		dispatch(setSearchedCampaign(v.target.value));
		dispatch(setCampaignView('campaignTable'));
	};
	const handleOnChange = (v) => {
		toast.dismiss();
		setSearch(v.target.value);
	};
	const hanldeClear = () => {
		setSearch(null);
		dispatch(setSearchedCampaign(null));
		setIsClick(false);
	};
	return (
		<div className="header-search">
			{isClick ? (
				<>
					<Input
						prefix={<img src={Search} />}
						suffix={
							<CloseOutlined
								onClick={hanldeClear}
								style={{
									color: 'rgba(0,0,0,.45)'
								}}
							/>
						}
						onChange={handleOnChange}
						defaultValue={search}
						value={search}
						size="large"
						placeholder="Search by campaign name"
						onPressEnter={handleOnPressEnter}
					/>
				</>
			) : (
				<span className="icon-wrap">
					<img src={Search} onClick={() => setIsClick(true)}></img>
				</span>
			)}
		</div>
	);
};
