import React from 'react';
import useAuth from './../../../Hooks/useAuth';

const DashBoardHome = () => {
    const {user,isAdmin}=useAuth()
    return (
        <>
            <h1 className='text-center'>Welcome To {isAdmin?'Admin':'User'} DashBoard Home !</h1> 
            <p className='text-center text-primary fs-1 fw-bold'>{user?.displayName?user.displayName:''}</p>
            <p className='text-center fs-3'>Please Click On Sidebar Menu To Visit Panel</p>
        </>
    );
};

export default DashBoardHome;