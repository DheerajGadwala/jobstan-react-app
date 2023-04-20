import React, {useEffect} from "react";
import RecruiterFollowItem from "./recruiter-follow-item";
import {useDispatch, useSelector} from "react-redux";
import {getAllRecruitersThunk} from "../services/users-thunk";

const FollowRecsList = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {followRecsArray} = useSelector((state) => state.allRecruiters);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRecruitersThunk(currentUser._id));
    }, [])
    

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <h3>Recruiters to Follow</h3>
            </li>
            {
                followRecsArray.length === 0 ?
                <li className="list-group-item">
                    No Recruiters Registered
                </li>
                :
                followRecsArray.map(followRec =>
                                        <RecruiterFollowItem
                                            key={followRec._id}
                                            followRec={followRec}
                                            currentUser={currentUser}
                                        />
                )
            }
        </ul>
    );
};

export default FollowRecsList;