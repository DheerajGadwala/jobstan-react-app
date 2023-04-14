import React, {useEffect} from "react";
import "./index.css";
import {logoutThunk, pendingJobPostersThunk, pendingJobSearchersThunk, approveUserThunk} from "../services/users-thunk";
import {Navigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

const AdminComponent = () => {
    const {logoutComp, pendingJobPosters, pendingJobSearchers} = useSelector((state) => state.users)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pendingJobPostersThunk())
    }, []);
    useEffect(() => {
        dispatch(pendingJobSearchersThunk())
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
            <h2>NGO's</h2>
            <div className="table-responsive" style={{height: "30vh", overflowY: "scroll"}}>
                <table className="table table-striped table-bordered mb-5">
                    <thead className="wd-th">
                    <tr className="text-nowrap">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">NGO Head Name</th>
                        <th scope="col">NGO Description</th>
                        <th scope="col">Primary Cause</th>
                        <th scope="col" colSpan={2}>Approve</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pendingJobPosters.length===0 &&
                        <div>
                            No Pending NGO's to review
                        </div>
                    }
                    {
                        pendingJobPosters.map((ngo, index) => {
                            return (
                                <tr key={ngo._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td className="text-nowrap">{ngo.name}</td>
                                    <td className="text-nowrap">{ngo.username}</td>
                                    <td className="text-nowrap">{ngo.email}</td>
                                    <td className="text-nowrap">{ngo.phone}</td>
                                    <td className="text-nowrap">{ngo.ngoHead}</td>
                                    <td>{ngo.ngoDesc}</td>
                                    <td>{ngo.ngoCause}</td>
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

            <h2>Donors</h2>
            <div className="table-responsive" style={{height: "30vh", overflowY: "scroll"}}>
                <table className="table table-striped table-bordered mb-5">
                    <thead className="wd-th">
                    <tr className="text-nowrap">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Profession</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Max Donation</th>
                        <th scope="col" colSpan={2}>Approve</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pendingJobSearchers.length===0 &&
                        <div>
                            No Pending Donors to review
                        </div>
                    }
                    {
                        pendingJobSearchers.map((donor, index) => {
                            return (
                                <tr key={donor._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td className="text-nowrap">{donor.name}</td>
                                    <td className="text-nowrap">{donor.username}</td>
                                    <td className="text-nowrap">{donor.email}</td>
                                    <td className="text-nowrap">{donor.phone}</td>
                                    <td className="text-nowrap">{donor.donorProf}</td>
                                    <td>{donor.donorSalary}</td>
                                    <td>{donor.donorMaxDon}</td>
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
            <footer>
                <input
                    type="button"
                    className="btn btn-color text-white wd-bottom-button"
                    style={{backgroundColor: "#5a4099"}}
                    onClick={logoutBtnHandle}
                    value="Logout"
                >
                </input>
            </footer>
        </div>
    );
};

export default AdminComponent;