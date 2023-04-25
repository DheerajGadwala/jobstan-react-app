import React, {useEffect} from "react";
import PostItem from "./post-item";
import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const PostList = (props) => {
    const {posts, searchPosts, loading} = useSelector(state => state.posts);
    const displayPosts = props.for === "home" ? posts : props.for === "search" ? searchPosts : [];
    return (
        <ul className="list-group">
            {
                loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                displayPosts.length===0 &&
                <li className="list-group-item">
                    No Jobs found.
                </li>
            }
            {
                displayPosts.map(post => <PostItem key={post._id} post={post}/>)
            }
        </ul>
    );
}

export default PostList;