import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./jobstan/services/users-thunk";
import {Link} from "react-router-dom";
import {Navigate, useLocation} from "react-router";


const NavigationSideBar = () => {
    const {currentUser, logoutComp} = useSelector((state) => state.users)

    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[1];

    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logoutThunk());
        <Navigate to={"/login"}/>
    }

    if (logoutComp) {
        return (<Navigate to={"/login"}/>)
    }

    return (
        <div className="list-group">
            <Link to="../home" className={`list-group-item list-group-item-action
        ${active === 'home' ? 'active' : ''}`}>
                <div className="row">
                    <div className="col-1">
                        <i className="bi bi-house-door-fill"></i>
                    </div>
                    <div className="col-2">
                        <span className="d-none d-xl-block">Home</span>
                    </div>
                </div>
            </Link>
            <Link to="../search" className={`list-group-item list-group-item-action
        ${active === 'search' ? 'active' : ''}`}>
                <div className="row">
                    <div className="col-1">
                        <i className="bi bi-search"></i>
                    </div>
                    <div className="col-2">
                        <span className="d-none d-xl-block">Search</span>
                    </div>
                </div>
            </Link>
            <Link to="../profile" className={`list-group-item list-import React from "react";
import PostsList from "../posts/post-list";
import UserList from "../users/user-list";
import SearchBar from "./searchBar";
import { useSelector } from "react-redux";

const SearchPageComponent = () => {
    
    const {currentUser} = useSelector((state) => state.users)
    return(
        <>
            <SearchBar/>
            {currentUser && currentUser.type == "APPLICANT" ? <PostsList/> : <></>}
            {currentUser && currentUser.type == "RECRUITER" ? <UserList/> : <></>}
        </>
    );
};
export default SearchPageComponent;group-item-action
        ${active === 'profile' ? 'active' : ''}`}>
                <div className="row">
                    <div className="col-1">
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <div className="col-2">
                        <span className="d-none d-xl-block">Profile</span>
                    </div>
                </div>
            </Link>
            {currentUser && <Link onClick={logoutHandler} className={`list-group-item list-group-item-action`}>
                <div className="row">
                    <div className="col-1">
                        <i className="bi bi-box-arrow-right"></i>
                    </div>
                    <div className="col-2">
                        <span className="d-none d-xl-block">Logout</span>
                    </div>
                </div>
            </Link>}
            {!currentUser && <Link to="../login" className={`list-group-item list-group-item-action
        ${active === 'login' ? 'active' : ''}`}>
            <div className="row">
                <div className="col-1">
                    <i className="bi bi-door-open-fill"></i>
                </div>
                <div className="col-2">
                    <span className="d-none d-xl-block">Login</span>
                </div>
            </div>
        </Link>}
            {!currentUser && <Link to="../register" className={`list-group-item list-group-item-action
        ${active === 'register' ? 'active' : ''}`}>
            <div className="row">
                <div className="col-1">
                    <i className="bi bi-book-fill"></i>
                </div>
                <div className="col-2">
                    <span className="d-none d-xl-block">Register</span>
                </div>
            </div>
        </Link>}
        </div>
    )
}

export default NavigationSideBar;