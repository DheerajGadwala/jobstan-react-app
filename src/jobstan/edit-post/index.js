import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";
import {updatePostThunk} from "../services/posts-thunk";

const EditPostComponent = ({route, navigate}) => {
    const location = useLocation();
    const post = location.state.epost;

    let [title, setTitle] = useState(post.titel);
    let [description, setDescription] = useState(post.description);
    let [pay, setPay] = useState(post.pay);
    let [skills, setSkills] = useState(post.skills);

    const dispatch = useDispatch();
    const navigate2 = useNavigate();

    function viewPost() {
        navigate2(`../view-post`, {state: {vpost: post}});
    }

    const updatePost = (updatedPost) => {
        dispatch(updatePostThunk(updatedPost));
        navigate2(`../view-post`, {state: {vpost: updatedPost}});
    }

    return (
        <div className="container">
            <div className="row d-flex h-100">
                <div className="col-md-12 col-xl-12">
                    <div className="card"
                         style={{borderRadius: "10px", backgroundColor: "#f0f0f0"}}>
                        <div className="card-body">
                            <div>
                                <h3 className="fw-bold text-center">Edit Post</h3>
                            </div>
                            <form className="card-body ">
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    <label htmlFor="title"><b>Title</b></label>
                                    <input type="text" className="form-control"
                                           id="title" defaultValue={post.title}
                                           onChange={event => setTitle(event.target.value)}/>
                                </div>
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    <label htmlFor="pay"><b>Pay</b></label>
                                    <input type="text" className="form-control"
                                           id="pay" defaultValue={post.pay}
                                           onChange={event => setPay(event.target.value)}/>
                                </div>
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    <label htmlFor="description"><b>Description</b></label>
                                    <input type="text" className="form-control"
                                           id="description" defaultValue={post.description}
                                           onChange={event => setDescription(event.target.value)}/>
                                </div>
                                <div className="form-group mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="skills"><b>Skills</b></label>
                                    <input type="text" className="form-control"
                                           id="skills" defaultValue={post.skills}
                                           onChange={event => setSkills(event.target.value)}/>
                                </div>
                                <div className="text-center mb-3">
                                    <button
                                        className="btn btn-primary rounded-pill"
                                        onClick={(e) =>
                                            updatePost({
                                                           ...post,
                                                           "title": title,
                                                           "description": description,
                                                           "pay": pay,
                                                           "skills": skills,
                                                       })}>Save Post
                                    </button>
                                </div>
                                <div className="form-text text-center text-dark">
                                    <a type="button"
                                       className="text-centre fw-bold text-decoration-none"
                                       onClick={viewPost}>
                                        Go back to Post
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPostComponent;