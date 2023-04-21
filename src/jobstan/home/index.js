import React from "react";
import PostsList from "../posts/post-list";
import CreatePost from "./createPost";
import {useSelector} from "react-redux";

const HomeComponent = () => {
    const {currentUser} = useSelector((state) => state.users);
    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }
    
    return(
        <>
            {!isApplicant && <CreatePost/>}
            <PostsList/>
        </>
    );
};
export default HomeComponent;