import React, {startTransition, useEffect} from "react";
import PostsList from "../posts/post-list";
import UserList from "../users/user-list";
import SearchBar from "./searchBar";
import { useDispatch ,useSelector } from "react-redux";
// import { clearPosts } from "../services/posts-reducer";
// import { clearUsers } from "../services/users-reducer";

const SearchPageComponent = () => {
    
    const {currentUser} = useSelector((state) => state.users)

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (currentUser) {
    //         dispatch(clearPosts());
    //         dispatch(clearUsers());
    //     }
    // }, [])

    return(
        <>
            <SearchBar/>
            {currentUser && currentUser.role == "APPLICANT" ? <PostsList/> : <></>}
            {currentUser && currentUser.role == "RECRUITER" ? <UserList/> : <></>}
        </>
    );
};
export default SearchPageComponent;