import React, {useState} from "react";
import PasswordChecklist from "react-password-checklist"
import {registerThunk} from "../services/users-thunk";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router";

const RegisterComponent = () => {
    const {currentUser, registerError, registerSuccess} = useSelector((state) => state.users)
    
    const [values, setValues] = useState({
                                             password: "",
                                             showPassword: false,
                                         });
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const dispatch = useDispatch()
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

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

    const [showApplicant, setShowApplicant] = useState(false);
    const [showRecruiter, setShowRecruiter] = useState(false);

    const handleRadioButtonChange = (e) => {
        if (e.target.value === 'Applicant') {
            setShowApplicant(true);
            setShowRecruiter(false);
        } else if (e.target.value === 'Recruiter') {
            setShowRecruiter(true);
            setShowApplicant(false);
        }
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [appUniv, setAppUniv] = useState("");
    const [appMajor, setAppMajor] = useState("");
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    const [recComp, setRecComp] = useState("");
    const [recCompDesc, setRecCompDesc] = useState("");
    const [positions, setPositions] = useState([]);
    const [newPosition, setNewPosition] = useState('');

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

    const handleRegisterBtn = () => {
        const role = showApplicant ? "APPLICANT" : "RECRUITER";
        if (name.length === 0) {
            window.alert("Please fill the name");
            return;
        }
        if (username.length < 6) {
            window.alert("Username must atleast consist of 6 characters");
            return;
        }
        if (email.length === 0) {
            window.alert("Please check the email input");
            return;
        }
        if (phone.length < 10) {
            window.alert("Please check the phone input");
            return;
        }
        if (address.length === 0) {
            window.alert("Please check address");
            return;
        }
        if (password.length === 0) {
            window.alert("Please fill password");
            return;
        }
        if (passwordAgain.length === 0) {
            window.alert("Please confirm the password");
            return;
        }
        if (role.length === 0) {
            window.alert("Please select the role");
            return;
        }
        if (showApplicant === true) {
            if (appUniv.length === 0) {
                window.alert("Please enter the university name");
                return;
            }
            if (appMajor.length === 0) {
                window.alert("Please enter the major");
                return;
            }
            if (skills.length === 0) {
                window.alert("Please enter atleast one skill");
                return;
            }
        }
        if (showRecruiter === true) {
            if (recComp.length === 0) {
                window.alert("Please enter the company name");
                return;
            }
            if (recCompDesc.length === 0) {
                window.alert("Please enter the company description");
                return;
            }
            if (positions.length === 0) {
                window.alert("Please enter atleast one position");
                return;
            }
        }
        const appSkills = skills
        const recPositions = positions

        dispatch(registerThunk({
                                   name, email,
                                   username, password, phone, address,
                                   role, appUniv, appMajor, appSkills,
                                   recComp, recCompDesc, recPositions
                               }))
    }

    console.log(currentUser)
    console.log(registerSuccess)
    console.log(registerError)

    if (currentUser) {
        return (<Navigate to={"/home"}/>)
    }

    if (registerSuccess === true) {
        console.log("register success")
        return (<Navigate to={"/login"}/>)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="card my-5">
                            <form className="card-body p-lg-4"
                                  style={{backgroundColor: "#FBFDFB"}}>
                                <div className="text-center">
                                    <img
                                        src="/images/jobs.jpg"
                                        className="img-fluid img-thumbnail rounded-circle my-3"
                                        width="200" alt="profile"/>
                                </div>
                                <div className="mb-2 text-danger">{registerError}</div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="reg-name"
                                           placeholder="Name"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <input type="email" className="form-control" id="reg-email"
                                           placeholder="Email Address"
                                           onChange={(e) => checkEmail(e)
                                           }
                                           required/>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{emailError}</span>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="reg-user"
                                           placeholder="Username"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <input type={values.showPassword ? "text" : "password"}
                                           className="form-control mb-3"
                                           onChange={e => setPassword(e.target.value)}
                                           id="reg-pass" placeholder="Password" required/>
                                    <input type={values.showPassword ? "text" : "password"}
                                           className="form-control"
                                           onChange={e => setPasswordAgain(e.target.value)}
                                           id="reg-pass-confirm" placeholder="Confirm Password"
                                           required/>
                                    <label><input className="mt-2" type="checkbox"
                                                  onClick={handleClickShowPassword}/> Show Password</label>
                                    <PasswordChecklist
                                        rules={["minLength","specialChar","number","capital","match"]}
                                        minLength={6}
                                        value={password}
                                        valueAgain={passwordAgain}
                                        messages={{
                                            minLength: "password meets the minimum length",
                                            specialChar: "password contains a special character",
                                            number: "password contains a number",
                                            capital: "password contains a capital letter",
                                            match: "password matches.",
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" id="reg-phone"
                                           placeholder="Mobile number"
                                           pattern="[0-9]{10}"
                                           value={phone}
                                           onChange={(e) => setPhone(e.target.value)}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="reg-address"
                                           placeholder="Address"
                                           value={address}
                                           onChange={(e) => initialize(e)}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label>Select your role
                                        <div>
                                            <input type="radio" value="Applicant" name="role" onChange={handleRadioButtonChange} /> Applicant
                                            &nbsp;&nbsp;&nbsp;
                                            <input type="radio" value="Recruiter" name="role" onChange={handleRadioButtonChange} /> Recruiter
                                        </div>
                                    </label>
                                </div>
                                {
                                    showApplicant && <div className="mb-3">
                                                <input
                                                    className="form-control"
                                                    id="reg-head"
                                                    type="text"
                                                    placeholder="University name"
                                                    value={appUniv}
                                                    onChange={(e) => setAppUniv(e.target.value)}
                                                    required
                                                />
                                            </div>
                                }
                                {
                                    showApplicant && <div className="mb-3">
                                        <input
                                            className="form-control"
                                            id="reg-head"
                                            type="text"
                                            placeholder="Enter your major"
                                            value={appMajor}
                                            onChange={(e) => setAppMajor(e.target.value)}
                                            required
                                        />
                                    </div>
                                }
                                {
                                    showApplicant && <div className="form-group mb-3">
                                        <label htmlFor="skills">Skills:</label>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                id="skills"
                                                className="form-control"
                                                style={{marginRight: "10px"}}
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => {
                                                        setSkills([...skills, newSkill]);
                                                        setNewSkill('');
                                                    }}
                                                >
                                                    Add Skill
                                                </button>
                                            </div>
                                        </div>
                                        <ul className="list-group" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {skills.map((skill, index) => (
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center custom-list-item"
                                                    key={index}
                                                    style={{ height: '42px' }}
                                                >
                                                    <span>{skill}</span>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSkills(skills.filter((_, i) => i !== index));
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                {
                                    showRecruiter && <div className="mb-3">
                                        <input
                                            className="form-control"
                                            id="reg-head"
                                            type="text"
                                            placeholder="Enter the company name"
                                            value={recComp}
                                            onChange={(e) => setRecComp(e.target.value)}
                                            required
                                        />
                                    </div>
                                }
                                {
                                    showRecruiter && <div className="mb-3">
                                        <input
                                            className="form-control"
                                            id="reg-head"
                                            type="text"
                                            placeholder="Enter company description"
                                            value={recCompDesc}
                                            onChange={(e) => setRecCompDesc(e.target.value)}
                                            required
                                        />
                                    </div>
                                }
                                {
                                    showRecruiter && <div className="form-group mb-3">
                                        <label htmlFor="skills">Positions:</label>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                id="skills"
                                                className="form-control mr-2"
                                                style={{marginRight: "10px"}}
                                                value={newPosition}
                                                onChange={(e) => setNewPosition(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => {
                                                        setPositions([...positions, newPosition]);
                                                        setNewPosition('');
                                                    }}
                                                >
                                                    Add Position
                                                </button>
                                            </div>
                                        </div>
                                        <ul className="list-group" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {positions.map((position, index) => (
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center custom-list-item"
                                                    key={index}
                                                    style={{ height: '42px' }}
                                                >
                                                    <span>{position}</span>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setPositions(positions.filter((_, i) => i !== index));
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                <div className="text-center">
                                    <input
                                        type="button"
                                        className="btn btn-color px-5 mb-3 w-100 text-white"
                                        style={{backgroundColor: "#006400"}}
                                        onClick={handleRegisterBtn}
                                        value="Register"
                                    >
                                    </input>
                                </div>
                                <div id="reg-log"
                                     className="form-text text-center mb-3 text-dark">Already
                                    Registered?&nbsp;
                                    <a href="../login" className="fw-bold text-decoration-none"
                                       style={{color: "#006400"}}> Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RegisterComponent;