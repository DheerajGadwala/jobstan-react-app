import React from "react";
import {useSelector} from "react-redux";
import AdminComponent from "./admin";
import HomeComponent from "./home";
import ProfileComponent from "./profile";
import EditProfileComponent from "./edit-profile";
import {Route, Routes} from "react-router";
import ProtectedRoute from "./protected";


function Jobstan() {
    const {currentUser} = useSelector((state) => state.users)
    if (currentUser && currentUser.role === "ADMIN") {
        return (
            <div className="container">
                <AdminComponent/>
            </div>
        )
    } else {
        return <>
            <Routes>
                <Route index element={<HomeComponent/>}/>
                <Route path="home" element={<HomeComponent/>}/>

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfileComponent/>
                    </ProtectedRoute>
                }/>
                <Route path="/edit-profile" element={
                    <ProtectedRoute>
                        <EditProfileComponent/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </>
    }
}

export default Jobstan;