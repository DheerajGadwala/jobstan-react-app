import React from "react";
import {useLocation} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {deletePostThunk} from "../services/posts-thunk";

const ViewPostComponent = ({route, navigate}) => {
    const {currentUser} = useSelector((state) => state.users);
    const location = useLocation();
    const viewPost = location.state.vpost;

    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }

    function getTimeDifference(createdAt) {
        const currentDate = new Date();
        const differenceInSeconds = Math.floor(
            (currentDate.getTime() - new Date(createdAt).getTime()) / 1000);

        if (differenceInSeconds < 60) {
            return `${differenceInSeconds} seconds ago`;
        } else if (differenceInSeconds < 3600) {
            const differenceInMinutes = Math.floor(differenceInSeconds / 60);
            return `${differenceInMinutes} ${differenceInMinutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (differenceInSeconds < 86400) {
            const differenceInHours = Math.floor(differenceInSeconds / 3600);
            return `${differenceInHours} ${differenceInHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (differenceInSeconds < 2592000) {
            const differenceInDays = Math.floor(differenceInSeconds / 86400);
            return `${differenceInDays} ${differenceInDays === 1 ? 'day' : 'days'} ago`;
        } else if (differenceInSeconds < 31536000) {
            const differenceInMonths = Math.floor(differenceInSeconds / 2592000);
            return `${differenceInMonths} ${differenceInMonths === 1 ? 'month' : 'months'} ago`;
        } else {
            const differenceInYears = Math.floor(differenceInSeconds / 31536000);
            return `${differenceInYears} ${differenceInYears === 1 ? 'year' : 'years'} ago`;
        }
    }

    // Convert createdAt string from MongoDB to Date object
    const createdAt = new Date(viewPost.createdAt);
    const estCreatedAt = createdAt.toLocaleString('en-US', {timeZone: 'America/New_York'});

    const dispatch = useDispatch();

    function deletePostHandler() {
        dispatch(deletePostThunk(viewPost._id));
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex h-100">
                    <div className="col-md-12 col-xl-12">
                        <div className="card"
                             style={{borderRadius: "10px"}}>
                            <div className="card-body">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col">
                                            <div>
                                                <div className="fw-bolder mb-1"
                                                     style={{color: "#006400"}}>{viewPost.title}
                                                    <span className="text-secondary fw-normal">
                                &nbsp;&middot;&nbsp;{getTimeDifference(estCreatedAt)}</span>
                                                </div>
                                                <div className="mb-1">
                                                    <span className="fw-normal"
                                                          style={{color: "#006400"}}>@{viewPost.company}</span>
                                                </div>
                                                <div className="mb-1">
                                                    <span
                                                        className="text-secondary fw-normal">Salary:</span>&nbsp;
                                                    <span className="fw-normal"
                                                          style={{color: "black"}}>{viewPost.pay}</span>
                                                </div>
                                                {isApplicant && <div
                                                    className="text-secondary fw-normal mb-1">
                                                    Posted by Recruiter: <span className=""
                                                                               style={{color: "#006400"}}
                                                                               type="button">{viewPost.recruiter_name}</span>
                                                </div>}
                                                <div className="text-secondary fw-normal mb-2">
                                                    Skills: <span className=""
                                                                  style={{color: "black"}}>{viewPost.skills}</span>
                                                </div>
                                                <div className="fw-normal mb-2">
                                                    {viewPost.description}
                                                </div>
                                                <div className="row text-muted mt-3">
                                                    <div
                                                        className="col align-content-center justify-content-center d-flex">
                                                        <span style={{color: "#006400"}}><span
                                                            className="fw-bolder">{viewPost.applicants.length}</span>&nbsp;Applicants</span>
                                                    </div>
                                                    {isApplicant && <div
                                                        className="col align-content-center justify-content-center d-flex">
                                                        <span type="button">
                                                            <i style={{color: "#006400"}} className="fa fa-suitcase"
                                                               aria-hidden="true"></i> &nbsp;
                                                            <span style={{color: "#006400"}}>Apply</span>
                                                        </span>
                                                    </div>}

                                                    {!isApplicant &&
                                                     <div
                                                         className="col align-content-center justify-content-center d-flex">
                                                        <span type="button" onClick={deletePostHandler}>
                                                            <i style={{color: "#ff0e0e"}}
                                                               className="bi bi-trash3-fill"></i> &nbsp;
                                                            <span style={{color: "#ff0e0e"}}>Delete</span>
                                                        </span>
                                                     </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ViewPostComponent;