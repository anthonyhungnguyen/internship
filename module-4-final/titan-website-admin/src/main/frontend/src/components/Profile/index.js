import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./index.css"
import DeviceProfile from "./DeviceProfile"
import UserProfile from "./UserProfile"
import {
    generalSelector,
    storeExist,
    storeId,
    storeType,
} from "../../slices/general"
import axios from "axios"
import { message } from "antd"
import { useDispatch } from "react-redux"

message.config({
    top: 50,
})

export default React.memo(() => {
    const { id, type } = useSelector(generalSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        const checkIdAndTypeExists = async () => {
            await axios
                .post("http://localhost:8085/api/profile/exists", {
                    type: type,
                    id: id,
                })
                .then((response) => {
                    dispatch(storeExist(response.data))
                })
                .catch(console.error)
        }
        checkIdAndTypeExists()
    }, [id, type])

    return (
        <React.Fragment>
            {type === "devices" && <DeviceProfile />}
            {type === "users" && <UserProfile />}
        </React.Fragment>
    )
})
