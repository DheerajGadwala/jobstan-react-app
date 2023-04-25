import React from "react";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";

const ViewProfileComponent = ({route, navigate}) => {
    const {currentUser, clickedUser} = useSelector((state) => state.users);
    const viewUser = clickedUser;
    
    var isGuest = false
    if (!currentUser) {
        isGuest = true;
    }

    var isApplicant = false;
    if (viewUser && viewUser.role === "APPLICANT") {
        isApplicant = true;
    }
    
    console.log(viewUser);

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
                                        src="../jobstan-logo2.png"
                                        alt="avatar" className="rounded-circle img-fluid"
                                        style={{width: "150px"}}/>
                                    <h5 className="my-3">{viewUser.name}</h5>
                                    {!isApplicant && <p
                                        className="text-muted mb-1">@{viewUser.username}&nbsp;&nbsp;|&nbsp;&nbsp;Recruiter</p>}
                                    {isApplicant && <p
                                        className="text-muted mb-1">@{viewUser.username}&nbsp;&nbsp;|&nbsp;&nbsp;Applicant&nbsp;&nbsp;|&nbsp;&nbsp;{viewUser.appFollowing.length} Following</p>}
                                </div>
                                {!isGuest && <div className="row text-muted justify-content-center">
                                    <div className="col-auto">
                                        <i className="bi bi-envelope-fill"></i> &nbsp;
                                        <span>{viewUser.email}</span>
                                    </div>
                                </div> }

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
                                                                                    ? viewUser.appUniv
                                                                                    : viewUser.recComp}</p>
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
                                                                                    ? viewUser.appMajor
                                                                                    : viewUser.recCompDesc}</p>
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
                                                                                    ? viewUser.appSkills.join(
                                                            ", ")
                                                                                    : viewUser.recPositions.join(
                                                            ", ")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ViewProfileComponent;