import React, {useEffect} from "react";
import PostItem from "./post-item";
import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const PostList = () => {
    const {posts, loading} = useSelector(state => state.posts);

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