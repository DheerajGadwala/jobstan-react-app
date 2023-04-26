import React, {useEffect, useState} from "react";
import "./index.css";
import {logoutThunk, pendingRecruitersThunk, pendingApplicantsThunk, approveUserThunk} from "../services/users-thunk";
import {Navigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";

const AdminComponent = () => {
    const {logoutComp, pendingRecruiters, pendingApplicants} = useSelector((state) => state.users)
    const [forApplicants, setForApplicants] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pendingRecruitersThunk())
    }, []);
    useEffect(() => {
        dispatch(pendingApplicantsThunk())
    }, [])
    const logoutBtnHandle = () => {
        dispatch(logoutThunk());
    }

    if (logoutComp===true) {
        return (<Navigate to={"/login"}/>)
    }
    
    const approveUser = (user) => {
        dispatch(approveUserThunk(user._id))
    }

    return (
        <div>
            <h1 className="wd-header text-center fw-bold">DASHBOARD</h1>
            <DropdownButton title={forApplicants ? "Applicants" : "Recruiters"} variant="secondary">
            <Dropdown.Item onClick={() => setForApplicants(true)}>
                Applicant
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setForApplicants(false)}>
                Recruiter
            </Dropdown.Item>
            </DropdownButton>
            {
                forApplicants ? 
                <>
                    <div className="table-responsive" style={{height: "30vh", overflowY: "scroll"}}>
                        <table className="table table-striped table-bordered mb-5">
                            <thead className="wd-th">
                            <tr className="text-nowrap">
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email Address</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">University</th>
                                <th scope="col">Major</th>
                                <th scope="col">Skills</th>
                                <th scope="col" colSpan={2}>Approve</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                pendingApplicants.length===0 &&
                                <div>
                                    No Pending Applicants to review
                                </div>
                            }
                            {
                                pendingApplicants.map((donor, index) => {
                                    return (
                                        <tr key={donor._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td className="text-nowrap">{donor.name}</td>
                                            <td className="text-nowrap">{donor.username}</td>
                                            <td className="text-nowrap">{donor.email}</td>
                                            <td className="text-nowrap">{donor.phone}</td>
                                            <td className="text-nowrap">{donor.appUniv}</td>
                                            <td>{donor.appMajor}</td>
                                            <td>{donor.appSkills.join(", ")}</td>
                                            <td>
                                                <button className="wd-approve" onClick={() => approveUser(donor)}>Approve</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </> 
                : 
                <>
                    <div className="table-responsive" style={{height: "30vh", overflowY: "scroll"}}>
                        <table className="table table-striped table-bordered mb-5">
                            <thead className="wd-th">
                            <tr className="text-nowrap">
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email Address</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Company</th>
                                <th scope="col">Company Description</th>
                                <th scope="col" colSpan={2}>Approve</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                pendingRecruiters.length===0 &&
                                <div>
                                    No Pending Recruiters to review
                                </div>
                            }
                            {
                                pendingRecruiters.map((ngo, index) => {
                                    return (
                                        <tr key={ngo._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td className="text-nowrap">{ngo.name}</td>
                                            <td className="text-nowrap">{ngo.username}</td>
                                            <td className="text-nowrap">{ngo.email}</td>
                                            <td className="text-nowrap">{ngo.phone}</td>
                                            <td className="text-nowrap">{ngo.recComp}</td>
                                            <td>{ngo.recCompDesc}</td>
                                            <td>
                                                <button className="wd-approve" onClick={() => approveUser(ngo)}>Approve</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </>
            }
                <input
                    type="button"
                    className="btn btn-color text-white w-100"
                    style={{backgroundColor: "#006400"}}
                    onClick={logoutBtnHandle}
                    value="Logout"
                >
                </input>
        </div>
    );
};

export default AdminComponent;