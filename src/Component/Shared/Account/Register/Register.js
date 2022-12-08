import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import initialization from '../../../../firebase/firebaseInitialize';
import useAuth from '../../../../Hooks/useAuth';

initialization();
const Register = () => {
    // Get Firebase settings  from custom hook
    const { createUser, error } = useAuth();
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';

    // Get Input Values from registration field 
    const handleInput = e => {
        const copyUser = { ...userInfo };
        copyUser[e.target.name] = e.target.value;
        setUserInfo(copyUser);
    }

    const handleRegistrationForm = (e) => {
        e.preventDefault();
        if (userInfo.pass === userInfo.pass2) {
            createUser(userInfo.email, userInfo.pass, userInfo.userName, history, redirect_uri);
        }
        else {
            alert('Password Not Matched');
            return
        }
    }

    return (
        <>
            <div className="container p-5">
                <h1 className="text-center text-light">Register Here</h1>
                {error?.length ? <p className="h6 text-muted">{error}</p> : ''}
                <form onSubmit={handleRegistrationForm}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input name="userName" onChange={handleInput} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input name="email" onChange={handleInput} type="email" className="form-control" required />
                        <span className="form-text">We'll never share your email with anyone else.</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="pass" onChange={handleInput} type="password" className="form-control" required />
                        <span className="form-text">Must be 6-20 characters long.</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input name="pass2" onChange={handleInput} type="password" className="form-control" required />
                        <span className="form-text">Provide Same Password Again</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
};

export default Register;