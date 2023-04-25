import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostsThunk} from "../services/posts-thunk";
import {getBookmarksThunk} from "../services/bookmarks-thunk";
import PostItem from "../posts/post-item";

const BookmarksComponent = () => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.users);
    const {posts, loading} = useSelector(state => state.posts);
    const {bookmarks} = useSelector(state => state.bookmarks);

    useEffect(() => {
        if (currentUser) {
            dispatch(getPostsThunk(currentUser._id));
            dispatch(getBookmarksThunk());
        }
    }, [])

    const currUserBookmarks = bookmarks.filter(bookmark => bookmark.user_id === currentUser._id);
    const postIds = currUserBookmarks.map(bookmark => bookmark.post_id);
    const bookmarkedPosts = posts.filter(post => postIds.includes(post._id));

    return (
        <ul className="list-group">
            {
                loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                bookmarkedPosts.length === 0 &&
                <li className="list-group-item">
                    No Bookmarks added.
                </li>
            }
            {
                bookmarkedPosts.map(post => <PostItem key={post._id} post={post}/>)
            }
        </ul>
    );
};
export default BookmarksComponent;