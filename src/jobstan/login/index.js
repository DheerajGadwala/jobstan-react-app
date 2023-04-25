import React, {useState} from "react";
import {loginThunk} from "../services/users-thunk";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router";

const LoginComponent = () => {
    const {currentUser, loginError} = useSelector((state) => state.users)
    const [values, setValues] = useState({
                                             password: "",
                                             showPassword: false,
                                         });
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginBtnHandle = () => {
        dispatch(loginThunk({
                                username, password
                            }));
    }

    if (currentUser) {
        return (<Navigate to={"/home"}/>)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="card my-5">
                            <form className="card-body p-lg-4"
                                  style={{backgroundColor: "#F0F0F0"}}>
                                <div className="text-center">
                                    <img
                                        src="/images/jobs.jpg"
                                        className="img-fluid img-thumbnail rounded-circle my-3"
                                        width="200" alt="profile"/>
                                </div>
                                <h5 className="mt-3 mb-3">Sign in to your account</h5>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="login-user"
                                           aria-describedby="userHelp" placeholder="Username"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}
                                           required/>
                                </div>
                                <div className="mb-2">
                                    <input type={values.showPassword ? "text" : "password"}
                                           className="form-control" id="login-pass"
                                           placeholder="Password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           required/>
                                    <label><input className="mt-2" type="checkbox"
                                                  onClick={handleClickShowPassword}/> Show Password</label>
                                </div>
                                <div className="mb-3 text-danger">{loginError}</div>
                                <div className="text-center">
                                    <input
                                        type="button"
                                        className="btn btn-color px-5 mb-3 w-100 text-white"
                                        style={{backgroundColor: "#E7473C"}}
                                        onClick={loginBtnHandle}
                                        value="Login"
                                    >
                                    </input>
                                </div>
                                <div id="log-reg"
                                     className="form-text text-center mb-3 text-dark">
                                    <a href="/register" className="fw-bold text-decoration-none"
                                       style={{color: "#E7473C"}}>
                                        Don't have an account? Register</a>
                                </div>
                                <div id="log-guest"
                                     className="form-text text-center mb-3 text-dark">
                                    <a href="/home" className="fw-bold text-decoration-none"
                                       style={{color: "#E7473C"}}>Continue as Guest</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LoginComponent;