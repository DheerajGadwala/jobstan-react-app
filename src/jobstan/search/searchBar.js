import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {getFilteredPostsThunk} from "../services/posts-thunk";
import {getFilteredApplicantsThunk} from '../services/users-thunk'

const SearchBar = () => {
    const {currentUser} = useSelector((state) => state.users)
    let [title, setTitle] = useState('')
    let [company, setCompany] = useState('');
    let [university, setUniversity] = useState('');
    let [major, setMajor] = useState('');
    let [applied, setApplied] = useState(false);

    var isGuest = false;
    if (!currentUser) {
        isGuest = true;
    }

    const dispatch = useDispatch();

    const applyToggleHandler = (event) => {
        setApplied(event.target.checked);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!currentUser) {
            if (company.length != 0 || title.length != 0)
                dispatch(getFilteredPostsThunk({title: '~'+title, company: '~'+company}));
            else
                window.alert("Please fill in the search parameters");
        }
        else {
            if (currentUser.role == 'APPLICANT') {
                if (company.length != 0 || title.length != 0 || applied)
                    dispatch(getFilteredPostsThunk({title: '~'+title, company: '~'+company, applied: String(applied), user_id: currentUser._id}));
                else
                    window.alert("Please fill in the search parameters");
            }
            if (currentUser.role == 'RECRUITER') {
                if (university.length != 0 || major.length != 0)
                    dispatch(getFilteredApplicantsThunk({university: '~'+university, major: '~'+major, user_id: currentUser._id}));
                else
                    window.alert("Please fill in the search parameters");
            }
        }

    };

    return (
        <form>
            {
                currentUser && currentUser.role == "RECRUITER" ? 
                <div>
                <div className="row">
                    <div className="col-5">
                        <input type="text" value={major} placeholder="Major"
                               className="form-control mb-2" style={{boxShadow: "none"}}
                               onChange={(event) => setMajor(event.target.value)}/>
                    </div>
                    <div className="col-5">
                        <input type="text" value={university} placeholder="University"
                               className="form-control mb-2" style={{boxShadow: "none"}}
                               onChange={(event) => setUniversity(event.target.value)}/>
                    </div>
                    <div className="col-2">
                        <button
                            className="rounded-pill btn float-end ps-3 pe-3 fw-bold text-white"
                            style={{backgroundColor: "#006400"}}
                            type="submit"
                            onClick={onSubmit}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="col-12">
                    <hr/>
                </div>
            </div>
            :
            <></>
            }
            {
                currentUser && currentUser.role == "APPLICANT" ? 
                <div>
                <div className="row">
                    <div className="col-4">
                        <input type="text" value={title} placeholder="Job Title"
                               className="form-control mb-2" style={{boxShadow: "none"}}
                               onChange={(event) => setTitle(event.target.value)} required/>
                    </div>
                    <div className="col-4">
                        <input type="text" value={company} placeholder="Company"
                               className="form-control mb-2" style={{boxShadow: "none"}}
                               onChange={(event) => setCompany(event.target.value)}
                               required/>
                    </div>
                    <div className="col-2 d-flex align-content-center justify-content-center">
                        <input type="checkbox" id="applied" name="applied" value="Applied" checked={applied} onChange={applyToggleHandler}/>
                        <label className = "mt-2 mx-2" htmlFor="applied"> Applied</label>
                    </div>
                    <div className="col-2">
                        <button
                            className="rounded-pill btn float-end ps-3 pe-3 fw-bold text-white"
                            style={{backgroundColor: "#006400"}}
                            type="submit"
                            onClick={onSubmit}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="col-12">
                    <hr/>
                </div>
            </div>
            :
            <></>
            }

            {
                isGuest ?
                <div>
                    <div className="row">
                        <div className="col-5">
                            <input type="text" value={title} placeholder="Job Title"
                                   className="form-control mb-2" style={{boxShadow: "none"}}
                                   onChange={(event) => setTitle(event.target.value)} required/>
                        </div>
                        <div className="col-5">
                            <input type="text" value={company} placeholder="Company"
                                   className="form-control mb-2" style={{boxShadow: "none"}}
                                   onChange={(event) => setCompany(event.target.value)}
                                   required/>
                        </div>
                        <div className="col-2">
                            <button
                                className="rounded-pill btn float-end ps-3 pe-3 fw-bold text-white"
                                style={{backgroundColor: "#006400"}}
                                type="submit"
                                onClick={onSubmit}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="col-12">
                        <hr/>
                    </div>
                </div>
                                                               :
                <></>
            }
        </form>
    );
}

export default SearchBar;