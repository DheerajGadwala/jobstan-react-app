import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {profileThunk} from "./services/users-thunk";

const CurrentUser = ({children}) => {
    const {currentUser, loading} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(profileThunk())
    }, [])
    if (!loading) {
        return (children)
    } else {
        return null
    } //<Navigate to="/login"/>
}
export default CurrentUser