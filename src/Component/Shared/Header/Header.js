import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import './Header.css';

const Header = () => {
    // Retrieved firebase methos, state from custom hook
    const { user, logOut } = useAuth();
    return (
        <>
            <header id="header">
                <nav className="navbar navbar-light navbar-expand-lg" data-navbar-on-scroll="data-navbar-on-scroll">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img className="img-fluid h-25 w-50 me-auto" src="https://i.ibb.co/s3pGnNs/hero-cycle-logo.png" alt="Hero Cycle" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/bicycles">Explore Bicycles</Link>
                                </li>
                                {
                                    !user?.email &&
                                    <>
                                        <li className="nav-item">
                                            {/* Used To highlight  */}
                                            <NavLink className="nav-link"
                                                to="/account"
                                                activeStyle={{
                                                    fontWeight: "bold",
                                                    color: "#636"
                                                }}>
                                                Register
                                            </NavLink>
                                        </li>
                                    </>
                                }
                                {
                                    user?.email ?
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link"
                                                    to="/dashboard"
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink onClick={logOut} className="nav-link"
                                                    to="/"
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#EE4949"
                                                    }}>
                                                    LogOut
                                                </NavLink>
                                            </li>
                                            {/* Display User name if provided otherwise show anonymousUser  */}
                                            <li className="nav-item">
                                                <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true">
                                                    {user?.displayName ? user.displayName : 'AnonymousUser'}
                                                </Link>
                                            </li>
                                        </> : ''
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;