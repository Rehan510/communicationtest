import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import oneloadLogo from '../src/assets/images/OneloadLogo.svg';

import Login from './sharedComponents/Login';
import AppLayout from './sharedComponents/Layouts/AppLayout';
import config from './config/config';
const CampaignManagement = lazy(() => import('./component/campaignManagement'));
const ProtectedRoutes = lazy(() => import('./config/ProtectedRoutes'));
const NotFound = lazy(() => import('./sharedComponents/Information/NotFound'));

const SuspenseLoading = () => {
	return (
		<>
			<div className="main-logo-image">
				<img src={oneloadLogo} className="oneload-logo-rotate" />
			</div>
		</>
	);
};
const MainRoutes = () => {
	const SidebarLayout = () => (
		<>
			<AppLayout>
				<Outlet />
			</AppLayout>
		</>
	);
	const appInfo = `
  ******************************************************
  *                  EP-SYSTEMS                        *
  *                                                    *
  *             COMMUNICATION_PORTAL                   *
  *              ${config.environment}                 *
  *                                                    *
  *                                                    *
  *                                                    *
  *                                                    *
  * ****************************************************
  
  `;
	console.log(appInfo);
	return (
		<div className="app-wrapper">
			<Suspense fallback={<SuspenseLoading />}>
				<Routes>
					<Route element={<ProtectedRoutes />}>
						<Route path="/" element={<SidebarLayout />}>
							<Route path="/" element={<Navigate replace to={`/communication`} />} />
							<Route path="/communication" element={<CampaignManagement />} />
							<Route path="/history" element={<Login />} />
						</Route>
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default MainRoutes;
