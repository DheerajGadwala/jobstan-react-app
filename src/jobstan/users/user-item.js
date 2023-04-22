import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const UserItem = ({user}) => {

    function getTimeDifference(createdAt) {
        const currentDate = new Date();
        const differenceInSeconds = Math.floor((currentDate.getTime() - new Date(createdAt).getTime()) / 1000);

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
    const createdAt = new Date(user.createdAt);
    const estCreatedAt = createdAt.toLocaleString('en-US', { timeZone: 'America/New_York' });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    function viewuser() {
        // navigate(`/view-user`, {state: {vuser: user}});
    }
    
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col">
                    <div>
                        <div className="fw-bolder mb-1" style={{color: "#006400"}}>{user.name}
                            <span className="text-secondary fw-normal">
                                &nbsp;&middot;&nbsp;{user.username}</span>
                        </div>
                        <div type="button" onClick={viewuser}>
                            <div className="mb-1">
                                <span className="text-secondary fw-normal">Education:</span>&nbsp;
                                <span className="fw-normal" style={{color: "black"}}>@{user.appUniv}</span>
                            </div>
                            <div className="mb-1">
                                <span className="text-secondary fw-normal">Major:</span>&nbsp;
                                <span className="fw-normal" style={{color: "black"}}>{user.appMajor}</span>
                            </div>
                            <div className="text-secondary fw-normal mb-1">
                                Skills: <span className="" style={{color: "black"}}>{user.appSkills}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
export default UserItem;