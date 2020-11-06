import { SettingTwoTone } from "@ant-design/icons"
import { Drawer, Input, Result, Select, Skeleton, Tabs } from "antd"
import Axios from "axios"
import React, { Suspense, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    generalSelector,
    storeExist,
    storeId,
    storeType,
} from "../../../slices"
import FilterBar from "../Common/Activity/FilterBar"
import Network from "../Common/Network"

const { TabPane } = Tabs
const { Option } = Select
const { Search } = Input

const Connection = React.lazy(() => import("./Connection"))
const Overview = React.lazy(() => import("./Overview"))
const Tool = React.lazy(() => import("../Common/Tool"))

export default function UserProfile() {
    const { id, exist } = useSelector(generalSelector)
    const [typeSelect, setTypeSelect] = useState("userid")
    const [currentID, setCurrentID] = useState(id)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const handleTypeChange = (type) => {
        setCurrentID("")
        setTypeSelect(type)
    }

    const handleIDChange = (e) => {
        setCurrentID(e.target.value)
    }

    const handleSearch = async (newId) => {
        if (newId) {
            await Axios.post("http://localhost:8085/api/profile/exists", {
                type: typeSelect,
                id: newId,
            })
                .then((response) => {
                    if (response.data) {
                        dispatch(storeType(typeSelect))
                        dispatch(storeId(newId))
                    }
                    dispatch(storeExist(response.data))
                })
                .catch(console.error)
        } else {
            alert("Error", "Please re-check device ID", "error")
        }
    }

    const showDrawer = () => {
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
    }

    return (
        <React.Fragment>
            <Drawer
                title='Filter'
                placement='right'
                width={400}
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <FilterBar />
            </Drawer>
            <button
                style={{
                    position: "fixed",
                    top: "200px",
                    right: "0px",
                    fontSize: "30px",
                    zIndex: "9999",
                    width: "60px",
                    height: "50px",
                }}
                className='bg-white rounded shadow-xl flex items-center justify-center'
                onClick={showDrawer}
            >
                <SettingTwoTone />
            </button>
            <Tabs
                defaultActiveKey={"overview"}
                animated={true}
                type='card'
                tabBarExtraContent={
                    <Search
                        addonBefore={
                            <Select
                                defaultValue='users'
                                style={{ width: 100 }}
                                onChange={handleTypeChange}
                            >
                                <Option value='devices' disabled>
                                    Device
                                </Option>
                                <Option value='users'>User</Option>
                                <Option value='cards' disabled>
                                    Card
                                </Option>
                            </Select>
                        }
                        value={currentID}
                        defaultValue={currentID}
                        placeholder='enter id here'
                        onChange={handleIDChange}
                        onSearch={handleSearch}
                        size='large'
                        enterButton
                        allowClear={true}
                    />
                }
            >
                {exist ? (
                    <React.Fragment>
                        <TabPane tab='Overview' key='overview'>
                            <Overview />
                        </TabPane>
                        <TabPane tab='Connection' key='connection'>
                            <Connection />
                        </TabPane>
                        <TabPane tab='Network' key='network'>
                            <Network />
                        </TabPane>
                        <TabPane tab='Tool' key='tool'>
                            <Tool />
                        </TabPane>
                    </React.Fragment>
                ) : (
                    <div className='h-full w-screen flex items-center justify-center'>
                        <Result
                            status='404'
                            title='404'
                            subTitle='User ID does not exist'
                        />
                    </div>
                )}
            </Tabs>
        </React.Fragment>
    )
}
