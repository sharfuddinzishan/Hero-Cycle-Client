import { useEffect, useState } from 'react';
import initialization from './../firebase/firebaseInitialize';
import {
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, updateProfile,
    signInWithEmailAndPassword, createUserWithEmailAndPassword,
    signOut, sendEmailVerification, getIdToken
} from "firebase/auth";
import axios from 'axios';

initialization();
const useFirebase = () => {
    const [user, setUser] = useState({});
    let [loading, setLoading] = useState(true)
    let [loadingAdmin, setLoadingAdmin] = useState(true)
    let [error, setError] = useState(false);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const [isAdmin, setIsAdmin] = useState(false);

    const signInGoogle = (history, redirect_uri) => {
        setError('');
        signInWithPopup(auth, googleProvider)
            .then(response => {
                setUser(response.user);
                addUserToDB(response.user.email, response.user.displayName, true)
                if (isAdmin) {
                    history.replace('/dashboard');
                }
                else {
                    history.replace(redirect_uri);
                }
            })
            .catch(error => setError(error.message))
            .finally(() => {
                setLoading(false);
            });
    }

    const createUser = (email, pass, uname, history, redirect_uri) => {
        setError('');
        createUserWithEmailAndPassword(auth, email, pass)
            .then((result) => {
                // // Update user by providing nrewly registerd person name 
                // setUserFullName(uname)
                const newUser = {
                    displayName: uname,
                    email
                }
                setUser(newUser);
                addUserToDB(email, uname, false)
                history.push(redirect_uri);
                sendVerification();
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const setUserFullName = (username) => {
        setLoading(true);
        updateProfile(auth.currentUser, {
            displayName: username
        })
            .then(() => { })
            .catch((error) => { })
            .finally(() => setLoading(false));
    }

    const signInEmailPass = (email, pass, history, redirect_uri) => {
        setError('');
        signInWithEmailAndPassword(auth, email, pass)
            .then(response => {
                setUser(response.user);
                if (isAdmin) {
                    history.replace('/dashboard');
                }
                else {
                    history.replace(redirect_uri);
                }
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }

    const addUserToDB = (email, userName, isGoogleSignIn) => {
        let url = `https://hero-cycle-server-side-production.up.railway.app/user?email=${email}`
        axios.get(url)
            .then(result => {
                if ((isGoogleSignIn && !result.data.email) || !isGoogleSignIn) {
                    const newUser = { email, userName, role: 'user' }
                    axios.post(`https://hero-cycle-server-side-production.up.railway.app/users`, newUser)
                        .then(result => {
                            setUserFullName(userName);
                            alert('User Registered Successfully!')
                        })
                        .catch(e => alert('User Registered Failed!'))
                }
            })
            .finally(() => setLoading(false));
    }

    const logOut = () => {
        setError('')
        setLoading(true);
        signOut(auth)
            .then(() => setUser({}))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }
    const sendVerification = () => sendEmailVerification(auth.currentUser);

    useEffect(() => {
        // For performance unsubscribe used 
        const unsubscribe = onAuthStateChanged(auth, user => {
            setError('')
            if (user) {
                let url = `https://hero-cycle-server-side-production.up.railway.app/user/admin?email=${user.email}`;
                axios.get(url)
                    .then(result => {
                        if (result.data) {
                            setIsAdmin(true);
                        }
                    })
                    .finally(() => setLoadingAdmin(false))
                getIdToken(user)
                    .then(tokenID => localStorage.setItem('tokenID', tokenID));
                setUser(user);
            }
            else {
                setUser({});
            }
            setLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);

    // useEffect(() => {
    //     let url = `https://hero-cycle-server-side-production.up.railway.app/user/admin?email=${user.email}`;
    //     axios.get(url)
    //         .then(result => {
    //             if (result.data) {
    //                 setIsAdmin(true);
    //             }
    //         })
    //         .finally(() => setLoadingAdmin(false))
    // }, [user.email, loading])

    return {
        user,
        loading,
        setUser,
        setError,
        error,
        signInGoogle,
        signInEmailPass,
        logOut,
        createUser,
        setUserFullName,
        sendVerification,
        isAdmin,
        loadingAdmin
    };
};

export default useFirebase;