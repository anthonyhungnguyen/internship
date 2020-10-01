import React from 'react';
import { Card, Col, Input, Row, Button, Upload, message } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
const { Search } = Input;

message.config({
	top: 50
});

export default ({ setUserList }) => {
	const handlePreprocessUserListSearch = (listRaw) => {
		const preprocessedList = listRaw.split(',').map((x) => x.trim());
		setUserList(preprocessedList);
	};

	const props = {
		name: 'file',
		accept: 'text/csv',
		beforeUpload: (file) => {
			if (file.type !== 'text/csv') {
				message.error(`${file.name} is not a png file`, {});
			}
			return file.type === 'text/csv';
		},
		onChange(info) {
			console.log(info);
		}
	};

	return (
		<Card hoverable={true}>
			<p className="font-bold ">Enter User List (seperated by comma)</p>
			<Row justify="space-around">
				<Col span={24}>
					<Search
						placeholder="input search text"
						onSearch={(value) => handlePreprocessUserListSearch(value)}
						enterButton
						className="w-full"
					/>
				</Col>
				{/* <Col span={8}>
					<Upload {...props}>
						<Button icon={<UploadOutlined />}>Upload CSV List</Button>
					</Upload>
				</Col> */}
			</Row>
		</Card>
	);
};
