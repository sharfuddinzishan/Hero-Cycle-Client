import React, { useState } from 'react';
import axios from 'axios';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleInput = (e) => {
        setEmail(e.target.value)
    }
    const handleInputPass = (e) => {
        setPass(e.target.value)
    }
    const handleSubmit = (e) => {
        setSuccess(false)
        setError(false)
        e.preventDefault()
        const token = localStorage.getItem('tokenID')
        let headers = {
            "authorization": 'Bearer ' + token
        };
        const user = { email, pass }
        axios.put('https://hero-cycle-server-side-production.up.railway.app/user/admin', user, { headers })
            .then(result => {
                console.log(result)
                if (result.data.modifiedCount) {
                    setSuccess(true)
                }
                // if (result.data.modifiedCount || result.data.upsertedCount) {
                //     setSuccess(true)
                // }
                else {
                    setError(true)
                }
            })
            .catch(e => setError(true))
    }
    return (
        <>
            <div className='container p-2'>
                <h2>Make Admin</h2>
                {
                    success && <div className="alert alert-info" role="alert">
                        User Role Set To Admin
                    </div>
                }
                {
                    error && <div className="alert alert-warning" role="alert">
                        Failed To Set Role !
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        label="Email"
                        name="email"
                        onBlur={handleInput}
                        style={{ width: '60%' }}
                    />
                    <input
                        type="password"
                        label="Password"
                        name="pass"
                        onBlur={handleInputPass}
                        style={{ width: '60%' }}
                    />
                    <br /><br />
                    <button type="submit" className="btn btn-danger">Make Admin</button>
                </form>
            </div>
        </>
    );
};

export default MakeAdmin;