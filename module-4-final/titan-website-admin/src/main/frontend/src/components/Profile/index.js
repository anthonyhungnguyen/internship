import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { generalSelector, storeExist } from "../../slices"
import UserProfile from "./UserProfile"

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
    }, [id, type, dispatch])

    return (
        <React.Fragment>{type === "userid" && <UserProfile />}</React.Fragment>
    )
})
