import {React, useEffect} from "react";
import CreatePost from "./createPost";
import {getPreviousPostsThunk} from "../services/posts-thunk"
import {useDispatch, useSelector} from "react-redux";

const HomeComponent = () => {

    const {currentUser} = useSelector((state) => state.users);
    const {posts} = useSelector((state) => (()=>{console.log(state);return state.posts;})());
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPreviousPostsThunk(currentUser._id));
        // console.log(currentUser, posts);
    }, []);
    // console.log(currentUser, posts)
    return(
        <>
            <div>
                <CreatePost/>
            </div>
            <ul className="list-group">
            {
                (()=>{console.log(posts);return true;})() && posts === undefined || (posts !== undefined && posts.loading) &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                posts !== undefined && posts.map(post => {console.log(post); return <div></div>})
            }
            </ul>
        </>
    );
};
export default HomeComponent;