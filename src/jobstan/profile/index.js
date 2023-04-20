import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router";
import {Link} from "react-router-dom";
import {getNGOInterestedDonorThunk, getUserInterestsThunk} from "../services/users-thunk";

const ProfileComponent = () => {
    const {currentUser} = useSelector((state) => state.users);

    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }

    const dispatch = useDispatch();

    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-12 col-xl-12">
                        <div className="card"
                             style={{borderRadius: "10px", backgroundColor: "#f0f0f0"}}>
                            <div className="card-body text-center">
                                <div>
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar" className="rounded-circle img-fluid"
                                        style={{width: "150px"}}/>
                                    <h5 className="my-3">{currentUser.name}</h5>
                                    {!isApplicant && <p className="text-muted mb-1">@{currentUser.username}</p>}
                                    {isApplicant && <p className="text-muted mb-1">@{currentUser.username}&nbsp;&nbsp;|&nbsp;&nbsp;{currentUser.appFollowing.length} Following</p>}
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

                                <Link to="../edit-profile">
                                    <button
                                        className="btn btn-primary rounded-pill mt-2 margin-right-left"> Edit
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