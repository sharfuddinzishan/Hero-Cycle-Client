import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../../Hooks/useAuth';

const Login = () => {
    // Retrieved firebase methos, state from custom hook
    const { signInGoogle, signInEmailPass, error } = useAuth();
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';

    // Get Input Values
    const handleInput = e => {
        const copyUser = { ...userInfo };
        copyUser[e.target.name] = e.target.value;
        setUserInfo(copyUser);
    }

    // Google POP up login 
    const handleGoogleLogin = () => {
        signInGoogle(history, redirect_uri);
    }

    // Handle login form with given password and email 
    const handleLoginForm = (e) => {
        e.preventDefault();
        signInEmailPass(userInfo?.email, userInfo?.pass, history, redirect_uri);
    }

    return (
        <>
            <div className="container p-5">
                <h1 className="text-center text-light">Login Panel</h1>
                {error?.length ? <p className="h6 text-muted">{error}</p> : ''}
                <form onSubmit={handleLoginForm}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input name="email" onBlur={handleInput} type="email" className="form-control" required autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="pass" onBlur={handleInput} type="password" className="form-control" required autoComplete="off" />
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>
                <button onClick={handleGoogleLogin} className="d-block mx-auto mt-3 btn btn-primary">Google Login</button>
            </div>
        </>
    );
};

export default Login;