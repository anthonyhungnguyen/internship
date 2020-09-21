import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deviceSelector } from '../../../../../slices/device'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { Card, Modal, Select } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

export default () => {
    const { deviceId } = useSelector(deviceSelector)
    const [appIdData, setAppIdData] = useState(null)
    const [visible, setVisible] = useState(false)
    const [excludedList, setExcludedList] = useState([])

    useEffect(() => {
        const fetchAppIdData = async () => {
            const response = await fetch('http://localhost:8085/api/user_device/test/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `FOR v, e IN 1..1 INBOUND @id @@col FILTER e.type == @type COLLECT app_id = e.appid WITH COUNT INTO app_id_count SORT app_id_count RETURN {app_id, app_id_count}`,
                    bindVars: {
                        '@col': 'users_devices',
                        id: `devices/${deviceId}`,
                        type: 'transaction'
                    }
                })
            })
            const data = await response.json()
            setExcludedList(data.map(d => d.app_id).slice(0, -5))
            setAppIdData(data)
        }


        fetchAppIdData()
    }, [])

    const getGraphOptions = (data, excludedList) => {
        const processedData = data.filter(d => !excludedList.includes(d.app_id))

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            xAxis: {
                type: 'category',
                data: processedData.map(x => x.app_id)
            },
            series: [
                {
                    type: 'bar',
                    data: processedData.map(x => x.app_id_count)
                }
            ]
        };

    }

    const handleToggleVisible = () => {
        setVisible((old) => !old)
    }

    const handleSelectAppId = (e) => {
        console.log(e, excludedList)
        setExcludedList(old => old.filter(o => o !== e))
    }

    const handleDeselectAppId = (e) => {
        setExcludedList(old => [...old, e])
    }

    const handleOnClear = () => {
        setExcludedList(appIdData.map(d => d.app_id))
    }

    return appIdData && <React.Fragment>
        <Card
            title="Merchant Frequency"
            headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
            hoverable={true} extra={
                <button onClick={handleToggleVisible}>
                    {visible ? (
                        <FullscreenExitOutlined className="text-xl" />
                    ) : (
                            <FullscreenOutlined className="text-xl" />
                        )}
                </button>
            }
        >
            <span className="mx-2 font-bold float-right">APP ID</span>
            <Select
                mode="multiple"
                style={{ width: '30%', margin: 'center' }}
                placeholder="Please select"
                defaultValue={appIdData.filter(x => !excludedList.includes(x.app_id)).reverse().map(x => x.app_id)}
                onSelect={handleSelectAppId}
                onDeselect={handleDeselectAppId}
                options={appIdData.map(x => ({
                    value: x.app_id
                }))}
                onClear={handleOnClear}
                allowClear={true}
                maxTagCount={1}
                className="float-right"
            />
            <ReactEchartsCore echarts={echarts} option={getGraphOptions(appIdData, excludedList)} />

        </Card>

        <Modal
            title="Merchant Frequency"
            visible={visible}
            onOk={handleToggleVisible}
            onCancel={handleToggleVisible}
            centered
            width={1000}
            footer={null}
        >
            <ReactEchartsCore echarts={echarts} option={getGraphOptions(appIdData, excludedList)} style={{ height: '70vh', width: '100%' }} />
        </Modal>
    </React.Fragment>
}