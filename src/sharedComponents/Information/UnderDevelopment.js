import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';
const App = () => (
	<Result icon={<SmileOutlined />} title="This page is still under construction." extra={<SmileOutlined />} />
);
export default App;
