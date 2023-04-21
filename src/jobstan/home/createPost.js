import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {createPostThunk} from "../services/posts-thunk";

/*
_id: String,
title: String,
pay: Number,
description: String,
skills: String,
company: String,
recruiter_id: String,
applicants: {type: Array, default: []}

*/
const CreatePost = () => {
    const {currentUser} = useSelector((state) => state.users)
    let [title, setTitle] = useState('')
    let [pay, setPay] = useState('');
    let [description, setDescription] = useState('');
    let [skills, setSkills] = useState('');

    const dispatch = useDispatch();

    const onSubmit = () => {
        if (!currentUser) {
            window.alert("Login to create a request");
            return
        }
        const newPost = {
            title: title,
            pay: pay,
            description: description,
            skills: skills,
            company: currentUser.recComp,
            recruiter_id: currentUser._id,
            recruiter_name: currentUser.name,
            applicants: []
        }
        setTitle("");
        setDescription("");
        setPay("");
        setDescription("");
        dispatch(createPostThunk(newPost));
    };

    return (
        <form>
            <div>
                <div className="row">
                    <div className="col-6">
                        <input type="text" value={title} placeholder="Job Title"
                               className="form-control mb-2" style={{boxShadow: "none"}}
                               onChange={(event) => setTitle(event.target.value)} required/>
                    </div>
                    <div className="col-6">
                        <input type="text" value={pay} placeholder="Pay"
                               className="form-control mb-2" style={{boxShadow: "none"}}
                               onChange={(event) => setPay(event.target.value)}
                               required/>
                    </div>

                </div>
                <div className="row">
                    <div className="col-12">
                         <textarea value={description} placeholder="Description" rows="2"
                                   style={{width: "100%", boxShadow: "none"}}
                                   className="form-control mb-2"
                                   onChange={(event) => setDescription(event.target.value)}
                                   required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <input type="text" value={skills} placeholder="Skills"
                               className="form-control mb-2" style={{boxShadow: "none"}}
                               onChange={(event) => setSkills(event.target.value)}
                               required/>
                    </div>
                    <div className="col-2">
                        <button
                            className="rounded-pill btn float-end ps-3 pe-3 fw-bold text-white"
                            style={{backgroundColor: "#006400"}}
                            type="submit"
                            onClick={onSubmit}>
                            Post
                        </button>
                    </div>

                </div>
                <div className="col-12">
                    <hr/>
                </div>
            </div>
        </form>
    );
}

export default CreatePost;