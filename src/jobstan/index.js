import React from "react";
import {useSelector} from "react-redux";
import AdminComponent from "./admin";

function Jobstan() {
    const {currentUser} = useSelector((state) => state.users)
    if (currentUser && currentUser.role === "ADMIN") {
        return (
            <div className="container">
                <AdminComponent/>
            </div>
        )
    } else {
        return <></>
    }
}

export default Jobstan;