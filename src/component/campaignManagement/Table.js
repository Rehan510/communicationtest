import React, { useCallback, useEffect, useState } from 'react';
import frameImage from '../../assets/images/frame.svg';
import { Pagination, Spin } from 'antd';
import Tablefilters from './TableFilters/TableFilters';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignView, setCampaignStep } from '../../reducers/communication';
import { setSelectedCampaign, setCampaignData, setIsPagination } from '../../reducers/campaign';
import axios from 'axios';
import { get, isNil } from 'lodash';
import { APPROVE, REJECT, PENDING_APPROVAL, DRAFT } from '../../config/campaignStatusCodes';
import { managerTable, directorTable } from '../../config/data';
import dayjs from 'dayjs';

const Table = () => {
	const dispatch = useDispatch();
	const [campaigns, setCampaigns] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalElements, setTotalElements] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const dateFormat = 'DD.MM.YYYY';
	const { selectedCampaignTypeFilters, selectedCampaignStatusFilters, filterDates, searchedCampaign, isPagination } =
		useSelector((state) => state.campaignSlice);
	const { isManager, isDirector } = useSelector((state) => state.communicationSlice);
	const resetPagination = () => {
		setCurrentPage(1);
		setPageSize(10);
	};
	const getCampaigns = useCallback(async () => {
		setIsLoading(true);
		let pSize = pageSize;
		let pNumber = currentPage - 1;
		if (!isPagination) {
			pNumber = 0;
		}
		const filterByTypes = selectedCampaignTypeFilters.map((types) => types.campaignTypeId);
		const filterByStatus = selectedCampaignStatusFilters.map((types) => types.campaignStatusId);
		let resp = [];
		const payload = {
			campaignName: searchedCampaign ? searchedCampaign : undefined,
			campaignStatusIds: filterByStatus,
			campaignTypeIds: filterByTypes,
			pageNumber: pNumber,
			pageSize: pSize,
			...filterDates
		};
		try {
			const data = await axios.post(`campaign/filter`, payload);
			const error = get(data, 'data.error', false);
			resp = get(data.data, 'data.campaignDTOs', []);
			const totalElement = get(data.data, 'data.totalElements', 1);
			if (error) {
				console.log('error');
			}
			setTotalElements(totalElement);
			setCampaigns(resp);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setCampaigns([]);
		}
	}, [
		pageSize,
		currentPage,
		selectedCampaignTypeFilters,
		selectedCampaignStatusFilters,
		filterDates,
		searchedCampaign,
		isPagination
	]);

	useEffect(() => {
		getCampaigns();
	}, [getCampaigns]);

	const onShowSizeChange = (current, pageSize) => {
		dispatch(setIsPagination(true));
		setPageSize(pageSize);
	};
	const handleCampaign = (c) => {
		const getDays = get(c, 'campaignDays', []).map((v) => v.day);
		const data = { ...c, campaignDays: getDays };
		dispatch(setCampaignData(data));
		dispatch(setSelectedCampaign(data));
		if (c.campaignStatusId === APPROVE || c.campaignStatusId === PENDING_APPROVAL) {
			dispatch(setCampaignView('campaignDetail'));
		}
		if (isManager) {
			if (c.campaignStatusId === DRAFT) {
				dispatch(setCampaignView('newCampaign'));
				dispatch(setCampaignStep(c.savedStep));
			}
		}
		if (c.campaignStatusId === REJECT) {
			if (isManager) {
				dispatch(setCampaignView('rejectedCampaign'));
			}
			if (isDirector) {
				dispatch(setCampaignView('campaignDetail'));
			}
		}
	};
	const onPaginationHandler = (page) => {
		dispatch(setIsPagination(true));
		setCurrentPage(page);
	};

	const getCurrentStatus = (status) => {
		let comp = <img src={frameImage} />;
		if (status === null) {
			return comp;
		}
		if (status) {
			comp = <span className="active">Active</span>;
		} else {
			comp = <span className="InActive">InActive</span>;
		}
		return comp;
	};
	const startEntry = (currentPage - 1) * pageSize + 1;
	const endEntry = Math.min(startEntry + pageSize - 1, totalElements);
	const tableRows = isManager ? managerTable : directorTable;

	const getManagerTable = (camp) => {
		return (
			<>
				<td>
					{isNil(camp.createdDateTime) ? null : dayjs(get(camp, 'createdDateTime', Date.now())).format(dateFormat)}
				</td>
				<td>{get(camp, 'campaignName', null)}</td>
				<td>{get(camp, 'campaignType', null)}</td>
				<td>{get(camp, 'campaignStatus', null)}</td>
				<td>{getCurrentStatus(camp.activeInd)}</td>
			</>
		);
	};
	const getDirectorTable = (camp) => {
		return (
			<>
				<td>
					{isNil(camp.submittedDateTime) ? null : dayjs(get(camp, 'submittedDateTime', Date.now())).format(dateFormat)}
				</td>
				<td>
					{isNil(camp.createdDateTime) ? null : dayjs(get(camp, 'createdDateTime', Date.now())).format(dateFormat)}
				</td>
				<td>{get(camp, 'campaignName', null)}</td>
				<td>{get(camp, 'campaignType', null)}</td>
				<td>{isNil(camp.createdByName) ? 'Manager' : camp.createdByName}</td>
				<td>{get(camp, 'campaignStatus', null)}</td>
				<td>{getCurrentStatus(camp.activeInd)}</td>
			</>
		);
	};

	return (
		<div>
			<Spin tip={'Please wait'} spinning={isLoading} size="large">
				<Tablefilters resetPagination={resetPagination} />
				<div className="compaign-table">
					<table>
						<thead>
							<tr>
								{tableRows.map((tableHead, index) => (
									<React.Fragment key={`tableHeading${index}`}>
										<th>{tableHead}</th>
									</React.Fragment>
								))}
							</tr>
						</thead>
						<tbody>
							{campaigns.map((camp, index) => {
								return (
									<tr
										key={`key${index}`}
										style={{ cursor: 'pointer' }}
										onClick={() => {
											handleCampaign(camp);
										}}
									>
										{isManager && getManagerTable(camp)}
										{isDirector && getDirectorTable(camp)}
									</tr>
								);
							})}
						</tbody>
					</table>

					<div className="table-footer">
						{totalElements > 0 ? (
							<p> {`Showing ${startEntry} to ${endEntry} of ${totalElements} entries`}</p>
						) : (
							<p> {`Showing 0 to 0 of 0 entries`}</p>
						)}

						<Pagination
							onChange={onPaginationHandler}
							current={currentPage}
							total={totalElements}
							pageSize={pageSize}
							onShowSizeChange={onShowSizeChange}
							responsive={true}
							// pageSizeOptions={[5, 10, 20, 50]}s
							showQuickJumper
							showSizeChanger={false}
						/>
					</div>
				</div>
			</Spin>
		</div>
	);
};

export default Table;
