import { useState, useCallback, useMemo } from 'react';
import React, { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [about_me, setAboutMe] = useState('');
    const [gender, setGender] = useState(0);
    const navigate = useNavigate();

    const handleUsernameChange = useCallback((e) => {
        setUsername(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const handleNameChange = useCallback((e) => {
        setName(e.target.value);
    }, []);

    const handleSurnameChange = useCallback((e) => {
        setSurname(e.target.value);
    }, []);

    const handleEmailChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const handleAboutMeChange = useCallback((e) => {
        setAboutMe(e.target.value);
    }, []);

    const handleGenderChange = useCallback((e) => {
        setGender(Number(e.target.value));
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const regobj = {
                username,
                name,
                surname,
                password,
                email,
                about_me,
                gender,
            };

            try {
                const response = await fetch('http://localhost:8000/api/addUser', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(regobj),
                });

                if (response.ok) {
                    console.log('Registered successfully.');
                    navigate('/login');
                } else {
                    throw new Error('Failed to register.');
                }
            } catch (err) {
                console.log('Failed: ' + err.message);
            }
        },
        [username, name, surname, password, email, about_me, gender, navigate]
    );
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            value={username}
                                            onChange={handleUsernameChange}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
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
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            value={name}
                                            onChange={handleNameChange}
                                            className="form-control"
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Surname</label>
                                        <input
                                            value={surname}
                                            onChange={handleSurnameChange}
                                            className="form-control"
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="form-control"
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>About me</label>
                                        <input
                                            value={about_me}
                                            onChange={handleAboutMeChange}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br></br>
                                        <input
                                            type="radio"
                                            checked={gender === 1}
                                            onChange={handleGenderChange}
                                            name="gender"
                                            value="1"
                                            id="flexRadioDefault1"
                                        ></input>
                                        <label>Male</label>
                                        <input
                                            type="radio"
                                            checked={gender === 2}
                                            onChange={handleGenderChange}
                                            name="gender"
                                            value="2"
                                            id="flexRadioDefault2"
                                        ></input>
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                               Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
