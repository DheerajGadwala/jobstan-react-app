import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileThunk} from "../services/users-thunk";

const RecruiterFollowItem = ({followRec, currentUser}) => {
    const dispatch = useDispatch();

    const updateProfile = (updatedProfile) => {
        dispatch(updateProfileThunk(updatedProfile));
    }

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-10">
                    <div className="fw-bold">{followRec.name}</div>
                    <div>Recruiter @{followRec.recComp}</div>
                </div>
                <div className="col-2">
                    <button onClick={() => updateProfile({
                                                             ...currentUser,
                                                             appFollowing : [...currentUser.appFollowing,
                                                                              followRec.username],
                                                         })}
                            className="btn btn-primary rounded-pill float-end mt-1">Follow
                    </button>
                </div>
            </div>
        </li>
    );
};

export default RecruiterFollowItem;