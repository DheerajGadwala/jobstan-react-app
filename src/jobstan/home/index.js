import React, {useEffect} from "react";
import PostsList from "../posts/post-list";
import CreatePost from "./createPost";
import {useDispatch, useSelector} from "react-redux";
import {getPostsThunk} from "../services/posts-thunk";

const HomeComponent = () => {
    const {currentUser} = useSelector((state) => state.users);
    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }
    
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(currentUser)
        if (currentUser) {
            console.log('here')
            dispatch(getPostsThunk(currentUser._id));
        }
    }, [])
    
    return(
        <>
            {!isApplicant && <CreatePost/>}
            <PostsList for="home"/>
        </>
    );
};
export default HomeComponent;