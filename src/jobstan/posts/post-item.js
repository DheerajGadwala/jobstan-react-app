import React, {useEffect} from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePostThunk, updatePostThunk} from "../services/posts-thunk";
import {getUserThunk} from "../services/users-thunk";
import {createBookmarkThunk, deleteBookmarkThunk, getBookmarksThunk} from "../services/bookmarks-thunk";

const PostItem = ({post}) => {
    const {clickedUser} = useSelector((state) => state.users);

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

    const {currentUser} = useSelector((state) => state.users);

    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }

    // Convert createdAt string from MongoDB to Date object
    const createdAt = new Date(post.createdAt);
    const estCreatedAt = createdAt.toLocaleString('en-US', {timeZone: 'America/New_York'});
    var alreadyApplied = false
    if (currentUser) {
        alreadyApplied = post.applicants.includes(currentUser._id);
    }

    const dispatch = useDispatch();

    function deletePostHandler() {
        dispatch(deletePostThunk(post._id));
    }

    function applyPostHandler(updatedPost) {
        dispatch(updatePostThunk(updatedPost));
        alreadyApplied = true;
    }

    const navigate = useNavigate();

    function viewPost() {
        navigate(`/view-post`, {state: {vpost: post}});
    }

    function moveToViewProfile() {
        dispatch(getUserThunk(post.recruiter_id))
        if (clickedUser) {
            navigate(`/view-profile`, {state: {user: clickedUser}});
        }
    }


    useEffect(() => {
        dispatch(getBookmarksThunk());
    }, [])

    const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
    const currentBookmark = bookmarks.find(
        (bookmark) => bookmark.post_id === post._id && bookmark.user_id === currentUser._id
    );

    const [bookmarked, setBookmarked] = useState(!!currentBookmark);

    useEffect(() => {
        if (currentBookmark) {
            setBookmarked(true);
        } else {
            setBookmarked(false);
        }
    }, [currentBookmark]);


    function bookmarkClickHandler() {
        if (bookmarked && currentBookmark) {
            dispatch(deleteBookmarkThunk(currentBookmark._id));
        }
        else {
            const bookmark = {
                post_id: post._id,
                user_id: currentUser._id
            }
            dispatch(createBookmarkThunk(bookmark))
        }
    }
    console.log("-------------------------------")
    console.log(post._id)
    console.log(currentBookmark)
    console.log("-------------------------------")

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col">
                    <div>
                        <div className="fw-bolder mb-1" style={{color: "#006400"}}>{post.title}
                            <span className="text-secondary fw-normal">
                                &nbsp;&middot;&nbsp;{getTimeDifference(estCreatedAt)}</span>
                            {isApplicant &&
                             <span type="button" className="float-end" onClick={bookmarkClickHandler}>
                                 {
                                     bookmarked ?
                                     <i className="bi bi-bookmark-fill"></i> :
                                     <i className="bi bi-bookmark"></i>
                                 }
                            </span> }
                        </div>
                        <div type="button" onClick={viewPost}>
                            <div className="mb-1">
                                <span className="fw-normal"
                                      style={{color: "black"}}>@{post.company}</span>
                            </div>
                            <div className="mb-1">
                                <span className="text-secondary fw-normal">Salary:</span>&nbsp;
                                <span className="fw-normal"
                                      style={{color: "black"}}>{post.pay}</span>
                            </div>
                            <div className="text-secondary fw-normal mb-1">
                                Skills: <span className=""
                                              style={{color: "black"}}>{post.skills}</span>
                            </div>
                        </div>
                        {isApplicant && <div className="text-secondary fw-normal mb-1">
                            Posted by Recruiter: <span className="fw-bolder"
                                                       onClick={moveToViewProfile}
                                                       style={{color: "#006400"}}
                                                       type="button">{post.recruiter_name}</span>
                        </div>}

                        <div className="row text-muted mt-3">
                            <div className="col align-content-center justify-content-center d-flex">
                                <span className="fw-bolder" style={{color: "#006400"}}><span
                                    className="fw-bolder">{post.applicants.length}</span>&nbsp;Applicants</span>
                            </div>

                            {isApplicant ? (
                                alreadyApplied ? (
                                    <div
                                        className="col align-content-center justify-content-center d-flex">
                                        <span>
                                            <i style={{color: "#006400"}}
                                               className="bi bi-check-circle-fill"
                                               aria-hidden="true"></i> &nbsp;
                                            <span className="fw-bolder"
                                                  style={{color: "#006400"}}>Applied</span>
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="col align-content-center justify-content-center d-flex">
                                        <span type="button" onClick={() => applyPostHandler(
                                            {...post, applicants: [...post.applicants, currentUser._id]})}>
                                            <i style={{color: "#006400"}} className="fa fa-suitcase" aria-hidden="true"></i> &nbsp;
                                            <span className="fw-bolder" style={{color: "#006400"}}>Apply</span>
                                        </span>
                                    </div>
                                )
                            ) : null}
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
    );
}
export default PostItem;