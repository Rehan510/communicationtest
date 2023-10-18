import React from 'react';
import store from './config/configureStore';
import config from './config/config';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import 'antd/dist/reset.css';
import './assets/css/style.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter basename={`/${config.appUrl}`}>
				<Routes />
				<ToastContainer />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
