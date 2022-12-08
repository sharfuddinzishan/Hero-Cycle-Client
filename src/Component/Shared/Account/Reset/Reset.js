import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import React, { useState } from 'react';

const Reset = () => {
    const auth = getAuth();
    const [email, setEmail] = useState();
    const [error, setError] = useState("");

    const handleInput = e => {
        setEmail(e.target.value)
    }

    const handleResetForm = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(response => {
                setError('');
                alert('Reset Link Send To Email')
            })
            .catch(error => {
                setError(error.message)
            })
    }
    return (
        <>
            <h1 className="text-center text-light">Rest Panel</h1>
            {error.length ? <p className="h6 text-muted">{error}</p> : ''}
            <form onSubmit={handleResetForm}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input name="email" onBlur={handleInput} type="email" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Reset</button>
            </form>
        </>
    );
};

export default Reset;