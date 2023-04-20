import React, {useEffect} from "react";
import RecruiterFollowItem from "./recruiter-follow-item";
import {useDispatch, useSelector} from "react-redux";
import {getAllRecruitersThunk} from "../services/users-thunk";

const FollowRecsList = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {allRecruiters} = useSelector((state) => state.users);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRecruitersThunk(currentUser._id));
    }, [])


    console.log(allRecruiters);


    return (
        <ul className="list-group">
            <li className="list-group-item">
                <h3>Recruiters to Follow</h3>
            </li>
            {
                allRecruiters.length === 0 ?
                <li className="list-group-item">
                    No Recruiters Registered
                </li>
                :
                allRecruiters.map(followRec =>
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