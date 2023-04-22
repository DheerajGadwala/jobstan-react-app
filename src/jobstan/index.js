import React from "react";
import {useSelector} from "react-redux";
import AdminComponent from "./admin";
import HomeComponent from "./home";
import ProfileComponent from "./profile";
import ViewProfileComponent from "./view-profile";
import ViewPostComponent from "./view-post";
import FollowRecsList from "./recruiters-follow/recruiter-follow-list";
import EditProfileComponent from "./edit-profile";
import EditPostComponent from "./edit-post";
import {Route, Routes} from "react-router";
import ProtectedRoute from "./protected";
import NavigationSideBar from "../navigation-sidebar";
import SearchPageComponent from "./search";


function Jobstan() {
    const {currentUser} = useSelector((state) => state.users)
    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }
    
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
                <div className="col-10 col-lg-8 col-xl-7">
                    <Routes>
                        <Route index element={<HomeComponent/>}/>
                        <Route path="home" element={<HomeComponent/>}/>
                        <Route path="search" element={<SearchPageComponent/>}/>
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
                        <Route path="view-profile" element={
                            <ViewProfileComponent/>
                        }/>
                        <Route path="view-post" element={
                            <ViewPostComponent/>
                        }/>
                        <Route path="/edit-post" element={
                            <EditPostComponent/>
                        }/>
                    </Routes>
                </div>
                <div className="d-none d-sm-none d-md-none d-lg-block col-lg-3 col-xl-3"
                     style={{overflowY: "scroll", height: "100vh"}}>
                    {isApplicant && <FollowRecsList/>}
                </div>
            </div>
        </>
    }
}

export default Jobstan;