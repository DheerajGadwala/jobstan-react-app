import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import UserList from "../users/user-list";
import {useDispatch} from "react-redux";
import {getFollowingRecsThunk} from "../services/users-thunk";

const ProfileComponent = () => {
    const {currentUser} = useSelector((state) => state.users);

    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }

    const dispatch = useDispatch();

    function displayFollowers() {
        const followersList = document.getElementById('followers-list');
        if (followersList.style.display==='none') {
            dispatch(getFollowingRecsThunk(currentUser._id));
            followersList.style.display = 'block';
        }
        else {
            followersList.style.display = 'none';
        }
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-12 col-xl-12">
                        <div className="card"
                             style={{borderRadius: "10px", backgroundColor: "#FBFDFB"}}>
                            <div className="card-body text-center">
                                <div>
                                    <img
                                        src="../jobstan-logo2.png"
                                        alt="profile" className="rounded-circle img-fluid"
                                        style={{width: "150px"}}/>
                                    <h5 className="my-3">{currentUser.name}</h5>
                                    {!isApplicant && <p className="text-muted mb-1">@{currentUser.username}&nbsp;&nbsp;|&nbsp;&nbsp;Recruiter</p>}
                                    {isApplicant && <p className="text-muted mb-1">@{currentUser.username}&nbsp;&nbsp;|&nbsp;&nbsp;Applicant&nbsp;&nbsp;|&nbsp;&nbsp;<span type="button" style ={{color: "#006400"}} onClick={displayFollowers}>{currentUser.appFollowing.length} Following</span></p>}
                                </div>
                                <div className="row text-muted justify-content-center">
                                    <div className="col-auto">
                                        <i className="bi bi-envelope-fill"></i> &nbsp;
                                        <span>{currentUser.email}</span>
                                    </div>
                                    <div className="col-auto">
                                        <i className="bi bi-geo-alt-fill"></i> &nbsp;
                                        <span>{currentUser.address}</span>
                                    </div>
                                    <div className="col-auto">
                                        <i className="bi bi-telephone-fill"></i> &nbsp;
                                        <span>{currentUser.phone}</span>
                                    </div>
                                </div>

                                {/*#Reference: https://mdbootstrap.com/docs/standard/extended/profiles*/}
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <div className="card mt-3 mb-2">
                                        <div className="card-body wd-profile-name-email">
                                            <div className="row">
                                                <div className="col-3">
                                                    <p className="mb-0">{isApplicant ? "University"
                                                                                     : "Company"}</p>
                                                </div>
                                                <div className="col-9">
                                                    <p className="text-muted mb-0">{isApplicant
                                                                                    ? currentUser.appUniv
                                                                                    : currentUser.recComp}</p>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-3">
                                                    <p className="mb-0">{isApplicant ? "Major"
                                                                                     : "Description"}</p>
                                                </div>
                                                <div className="col-9">
                                                    <p className="text-muted mb-0">{isApplicant
                                                                                    ? currentUser.appMajor
                                                                                    : currentUser.recCompDesc}</p>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-3">
                                                    <p className="mb-0">{isApplicant ? "Skills"
                                                                                     : "Positions"}</p>
                                                </div>
                                                <div className="col-9">
                                                    <p className="text-muted mb-0">{isApplicant
                                                                                    ? currentUser.appSkills.join(", ")
                                                                                   : currentUser.recPositions.join(", ")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="followers-list" style={{display: "none"}}>
                                    <h5 style ={{color: "#006400"}}>Following</h5>
                                    <UserList for="profile"/>
                                </div>
                                <Link to="../edit-profile">
                                    <button
                                        className="btn btn-primary rounded-pill mt-2 mb-3 margin-right-left"
                                        style ={{backgroundColor: "#006400", borderColor:"#006400"}}
                                        > Edit
                                        Profile
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProfileComponent;