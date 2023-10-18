import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
	const { isLoginRequired } = useSelector((state) => state.communicationSlice);
	return isLoginRequired ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;
