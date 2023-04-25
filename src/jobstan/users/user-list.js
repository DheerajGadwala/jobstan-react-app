import React from "react";
import UserItem from "./user-item";
import {useSelector} from "react-redux";

const UserList = (props) => {
    const {users, postApplicants, loading} = useSelector(state => state.users)
    const displayUsers = props.for == "search" ? users : 
    props.for == "view-post" ? postApplicants : 
    [];
    console.log(props, displayUsers, postApplicants);
    return (
        <ul className="list-group">
            {
                loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                displayUsers.length===0 &&
                <li className="list-group-item">
                    No Users found.
                </li>
            }
            {
                displayUsers.map(user => <UserItem key={user._id} user={user}/>)
            }
        </ul>
    );
}

export default UserList;