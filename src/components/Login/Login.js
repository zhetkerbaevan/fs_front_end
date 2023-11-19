import { useState, useCallback } from 'react';
import React, { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
const Login = () => {
    const { loginForReact } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = useCallback((e) => {
        setUsername(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    async function login(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/login", {
                username: username,
                password: password,
            }).then((res) =>
            {
                console.log(res.data);
                if (res.data.message === "Username does not exits")
                {
                    alert("Username does not exits");
                }
                else if(res.data.message === "Login Success")
                {
                    loginForReact();
                    navigate('/');
                }
                else
                {
                    alert("Incorrect Email and Password not match");
                }
            });
        } catch (err) {
            alert(err);
        }

    }

    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" >
                    <div className="card">
                        <div className="card-header">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body-login">
                            <div className="row">
                                <div className="col-lg">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            value={username}
                                            onChange={handleUsernameChange}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            value={password}
                                            onChange={handlePasswordChange}
                                            type="password"
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" onClick={login} className="btn btn-outline-secondary">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
