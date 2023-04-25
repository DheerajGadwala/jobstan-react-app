import React, {useEffect} from "react";
import PostsList from "../posts/post-list";
import CreatePost from "./createPost";
import {useDispatch, useSelector} from "react-redux";
import {getPostsThunk, getAllPostsThunk} from "../services/posts-thunk";
import { clearPosts } from "../services/posts-reducer";

const HomeComponent = () => {
    const {currentUser} = useSelector((state) => state.users);
    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(getPostsThunk(currentUser._id));
        }
        else {
            dispatch(getAllPostsThunk());
        }
        return ()=>{
            if (currentUser) {
                dispatch(clearPosts());
            }
        }
    }, [])
    
    return(
        <>
            {currentUser && !isApplicant && <CreatePost />}
            <PostsList/>
        </>
    );
};
export default HomeComponent;