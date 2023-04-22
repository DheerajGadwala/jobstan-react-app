import React, {useEffect} from "react";
import UserItem from "./user-item";
import {useSelector} from "react-redux";

const UserList = () => {
    const {users, loading} = useSelector(state => state.users)
    return (
        <ul className="list-group">
            {
                loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                users.length===0 &&
                <li className="list-group-item">
                    No Users found.
                </li>
            }
            {
                users.map(user => <UserItem key={user._id} user={user}/>)
            }
        </ul>
    );
}

export default UserList;