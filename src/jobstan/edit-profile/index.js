import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateProfileThunk} from "../services/users-thunk";

const EditProfileComponent = () => {
    const {currentUser} = useSelector((state) => state.users);

    let [name, setName] = useState(currentUser.name);
    let [email, setEmail] = useState(currentUser.email);
    let [address, setAddress] = useState(currentUser.address);
    let [phone, setPhone] = useState(currentUser.phone);

    let [appUniv, setAppUniv] = useState(currentUser.appUniv);
    let [appMajor, setAppMajor] = useState(currentUser.appMajor);
    let [appSkills, setAppSkills] = useState(currentUser.appSkills);
    let [newSkill, setNewSkill] = useState('');

    let [recComp, setRecComp] = useState(currentUser.recComp);
    let [recCompDesc, setRecCompDesc] = useState(currentUser.recCompDesc);
    let [recPositions, setRecPositions] = useState(currentUser.recPositions);
    let [newPosition, setNewPosition] = useState('');

    const [emailError, setEmailError] = useState('');
    const checkEmail = (e) => {
        var email = e.target.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError('Enter valid Email')
        } else {
            setEmailError('')
            setEmail(email);
        }
    };

    const initialize = (e) => {
        setAddress(e.target.value)
        var autocomplete = new window.google.maps.places.Autocomplete(
            (document.getElementById('reg-address')),
            {types: ['geocode']});
        autocomplete.addListener('place_changed', fillInAddress);
    }

    function fillInAddress() {
        var place = this.getPlace();
        setAddress(place.formatted_address);
    }

    var isApplicant = false;
    if (currentUser && currentUser.role === "APPLICANT") {
        isApplicant = true;
    }

    const dispatch = useDispatch();
    const updateProfile = (updatedProfile) => {
        dispatch(updateProfileThunk(updatedProfile));
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-12">
                    <div className="card"
                         style={{borderRadius: "10px", backgroundColor: "#f0f0f0"}}>
                        <div className="card-body text-center">
                            <div>
                                <h3 className="fw-bold">Edit Profile</h3>
                            </div>
                            <form className="card-body p-lg-5">
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    <label htmlFor="nameField"><b>Name</b></label>
                                    <input type="text" className="form-control"
                                           id="nameField" defaultValue={currentUser.name}
                                           onChange={event => setName(event.target.value)}/>
                                </div>
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    <label htmlFor="emailField"><b>Email</b></label>
                                    <input type="email" className="form-control"
                                           id="emailField" defaultValue={currentUser.email}
                                           onChange={event => checkEmail(event)}
                                    />
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{emailError}</span>
                                </div>
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    <label htmlFor="addressField"><b>Address</b></label>
                                    <input type="text" className="form-control"
                                           id="addressField" defaultValue={currentUser.address}
                                           onChange={event => initialize(event)}
                                    />
                                </div>
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    <label htmlFor="phoneField"><b>Mobile number</b></label>
                                    <input type="number" className="form-control" id="phoneField"
                                           defaultValue={currentUser.phone}
                                           pattern="[0-9]{10}"
                                           onChange={(event) => setPhone(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    {isApplicant &&
                                     <div>
                                         <label htmlFor="appUnivField"><b>University</b></label>
                                         <input type="text" className="form-control"
                                                id="appUnivField"
                                                defaultValue={currentUser.appUniv}
                                                onChange={(event) => setAppUniv(event.target.value)}
                                         />
                                     </div>}
                                </div>
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    {isApplicant &&
                                     <div>
                                         <label htmlFor="appMajorField"><b>Major</b></label>
                                         <input type="text" className="form-control"
                                                id="appMajorField"
                                                defaultValue={currentUser.appMajor}
                                                onChange={(event) => setAppUniv(event.target.value)}
                                         />
                                     </div>}
                                </div>
                                {
                                    isApplicant && <div className="form-group mb-2"
                                                        style={{textAlign: "left"}}>
                                        <label htmlFor="appSkillsField"><b>Skills</b></label>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                id="appSkillsField"
                                                className="form-control"
                                                style={{marginRight: "10px"}}
                                                placeholder="Enter any skill"
                                                onChange={(e) => setNewSkill(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => {
                                                        setAppSkills([...appSkills, newSkill]);
                                                        setNewSkill('');
                                                    }}
                                                >
                                                    Add Skill
                                                </button>
                                            </div>
                                        </div>
                                        <ul className="list-group"
                                            style={{maxHeight: '200px', overflowY: 'auto'}}>
                                            {appSkills.map((skill, index) => (
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center custom-list-item"
                                                    key={index}
                                                    style={{height: '42px'}}
                                                >
                                                    <span>{skill}</span>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            setAppSkills(appSkills.filter(
                                                                (_, i) => i !== index));
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    {!isApplicant &&
                                     <div>
                                         <label htmlFor="recCompField"><b>Company</b></label>
                                         <input type="text" className="form-control"
                                                id="recCompField"
                                                defaultValue={currentUser.recComp}
                                                onChange={(event) => setRecComp(event.target.value)}
                                         />
                                     </div>}
                                </div>
                                <div className="form-group mb-2" style={{textAlign: "left"}}>
                                    {!isApplicant &&
                                     <div>
                                         <label
                                             htmlFor="recCompDescField"><b>Description</b></label>
                                         <input type="text" className="form-control"
                                                id="recCompDescField"
                                                defaultValue={currentUser.recCompDesc}
                                                onChange={(event) => setRecCompDesc(
                                                    event.target.value)}
                                         />
                                     </div>}
                                </div>
                                {
                                    !isApplicant && <div className="form-group mb-2"
                                                         style={{textAlign: "left"}}>
                                        <label htmlFor="recPositionsField"><b>Positions</b></label>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                id="recPositionsField"
                                                className="form-control"
                                                style={{marginRight: "10px"}}
                                                placeholder="Enter the position name"
                                                onChange={(e) => setNewPosition(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => {
                                                        setRecPositions(
                                                            [...recPositions, newPosition]);
                                                        setNewPosition('');
                                                    }}
                                                >
                                                    Add Position
                                                </button>
                                            </div>
                                        </div>
                                        <ul className="list-group"
                                            style={{maxHeight: '200px', overflowY: 'auto'}}>
                                            {recPositions.map((position, index) => (
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center custom-list-item"
                                                    key={index}
                                                    style={{height: '42px'}}
                                                >
                                                    <span>{position}</span>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            setRecPositions(recPositions.filter(
                                                                (_, i) => i !== index));
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                <div className="text-center" >
                                    <Link to="../profile">
                                        <button
                                            className="btn btn-primary rounded-pill"
                                            onClick={() => updateProfile({
                                                                             ...currentUser,
                                                                             "name": name,
                                                                             "email": email,
                                                                             "phone": phone,
                                                                             "address": address,
                                                                             "appUniv": appUniv,
                                                                             "appMajor": appMajor,
                                                                             "appSkills": appSkills,
                                                                             "recComp": recComp,
                                                                             "recCompDesc": recCompDesc,
                                                                             "recPositions": recPositions,
                                                                         })}>Save Profile
                                        </button>
                                    </Link>
                                </div >
                                <div className="mt-3">
                                    <Link className="text-centre" to="../edit-profile">
                                        Go back to Profile
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileComponent;