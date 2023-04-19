import React from "react";
import {useSelector} from "react-redux";
import AdminComponent from "./admin";
import HomeComponent from "./home";
import ProfileComponent from "./profile";
import EditProfileComponent from "./edit-profile";
import {Route, Routes} from "react-router";
import ProtectedRoute from "./protected";
import NavigationSideBar from "../navigation-sidebar";


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
            <div className="row">
                <div className="col-2 col-lg-1 col-xl-2">
                    <NavigationSideBar/>
                </div>
                <div className="col-10 col-lg-11 col-xl-10">
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
                </div>
            </div>
        </>
    }
}

export default Jobstan;