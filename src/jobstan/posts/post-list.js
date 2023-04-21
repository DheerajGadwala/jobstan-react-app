import React, {useEffect} from "react";
import PostItem from "./post-item";
import {useDispatch, useSelector} from "react-redux";
import {getPostsThunk} from "../services/posts-thunk";
import {Navigate} from "react-router";

const PostList = () => {
    const {posts, loading} = useSelector(state => state.posts)
    const {currentUser} = useSelector((state) => state.users);

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(getPostsThunk(currentUser._id));
        }
    }, [])

    return (
        <ul className="list-group">
            {
                loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                posts.length===0 &&
                <li className="list-group-item">
                    No Jobs found.
                </li>
            }
            {
                posts.map(post => <PostItem key={post._id} post={post}/>)
            }
        </ul>
    );
}

export default PostList;