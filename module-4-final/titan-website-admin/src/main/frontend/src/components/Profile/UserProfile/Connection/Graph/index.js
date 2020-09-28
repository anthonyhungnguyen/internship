import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import { Card, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import { generateGraphData, preprocessMoreConnection } from '../../../../../slices/util';
import { userSelector } from '../../../../../slices/user';

export default React.memo(({ setCurrentChosenId, setCurrentType }) => {
	const { graphData } = useSelector(userSelector);

	// Used for restoring old depth
	let depthData = {};
	depthData[1] = graphData;
	let ref = useRef();

	const handleOnClick = async (e) => {
		if (e.data.type === 'device') {
			copy(e.data.id.trim());
			setCurrentChosenId(e.data.id.trim());
			setCurrentType(e.data.type);
		} else if (e.data.type === 'user') {
			copy(e.data.id.trim());
			setCurrentChosenId(e.data.id.trim());
			setCurrentType(e.data.type);
		} else if (e.data.type === 'card_account') {
			copy(e.data.id.trim());
			setCurrentChosenId(e.data.id.trim());
			setCurrentType(e.data.type);
		}
	};

	const processNewGraphData = (id, connections) => {
		let echartsInstance = ref.current.getEchartsInstance();
		const { data, edges } = echartsInstance.getOption()['series'][0];
		const nodeToExpand = data.find((d) => d.id === id);
		if (!nodeToExpand.expanded) {
			const moreConnection = preprocessMoreConnection(id, connections, data, edges, false, null);
			const newGraphData = generateGraphData(moreConnection);
			echartsInstance.setOption(newGraphData);
		}
	};

	const generateUnexpandedId = (item) => {
		switch (item.type) {
			case 'device':
				return 'devices/' + item.id;
			case 'user':
				return 'users/' + item.id;
			case 'card_account':
				return 'card_account/' + item.id;
		}
	};

	const expandOneDepth = async (depth) => {
		let echartsInstance = ref.current.getEchartsInstance();
		const { data, edges } = echartsInstance.getOption()['series'][0];
		if (!depthData[depth]) {
			const unExpandedId = data.filter((x) => !x.expanded).map((x) => generateUnexpandedId(x));
			if (unExpandedId.length !== 0) {
				const response = await fetch(`http://localhost:8085/api/user_device/test`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `
						LET idList = @idList
						FOR id in idList
							FOR v, e IN 1..1 ANY id GRAPH "test"
									COLLECT source = e._from, target = e._to
									RETURN {source, target}`,
						bindVars: {
							idList: unExpandedId
						}
					})
				});
				const connections = await response.json();

				const moreConnection = preprocessMoreConnection(null, connections, data, edges, true, unExpandedId);
				const newGraphData = generateGraphData(moreConnection);

				depthData[depth] = newGraphData;
				echartsInstance.setOption(newGraphData);
			}
		} else {
			echartsInstance.setOption(depthData[depth]);
		}
	};

	const handleDoubleClick = async (e) => {
		if (e.data.type === 'device') {
			const response = await fetch(`http://localhost:8085/api/user_device/device/${e.data.id}/connections`);
			const connections = await response.json();
			processNewGraphData(e.data.id, connections);
		} else if (e.data.type === 'user') {
			const response = await fetch(`http://localhost:8085/api/user_device/user/${e.data.id}/connections`);
			const connections = await response.json();
			processNewGraphData(e.data.id, connections);
		}
	};

	return (
		<div className="animated fadeIn">
			<Card
				className="w-full"
				title="Device Depth"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				extra={
					<React.Fragment>
						<Slider min={1} max={10} onChange={expandOneDepth} className="w-40" tooltipVisible />
					</React.Fragment>
				}
			>
				<ReactEcharts
					ref={ref}
					option={graphData}
					style={{ height: '65vh', width: '100%' }}
					renderer="canvas"
					onEvents={{
						click: handleOnClick,
						dblclick: handleDoubleClick
					}}
				/>
			</Card>
		</div>
	);
});
