import React from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import DashBoardHome from '../DashBoardHome/DashBoardHome'
import AddBicycle from '../../Admin/AddBicycle/AddBicycle'
import AllBicycles from '../../Admin/AllBicycles/AllBicycles'
import AllOrders from '../../Admin/AllOrders/AllOrders'
import MyOrders from '../../User/MyOrders/MyOrders'
import AddReviews from '../../User/AddReviews/AddReviews'
import MyReviews from '../../User/MyReviews/MyReviews'
import Pay from '../../User/Pay/Pay'
import AdminRoute from '../../../PrivateRoute/AdminRoute'
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import useFirebase from '../../../Hooks/useFirebase';
import MakeAdmin from '../../Admin/MakeAdmin/MakeAdmin';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    let { isAdmin, logOut } = useFirebase();

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4 col-md-3 m-0 p-0">
                        <ul className="list-unstyled">
                            <li className="bg-secondary mb-1 text-center">
                                <NavLink className="nav-link text-light"
                                    to={`${url}`}
                                    activeStyle={{
                                        fontWeight: "bold",
                                        color: "#636"
                                    }}>
                                    Dashboard Home
                                </NavLink>
                            </li>
                            {
                                isAdmin && <>
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}/admin/add/bycycle`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            Add Bicycle
                                        </NavLink>
                                    </li>
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}/admin/show/bicycles`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            All Bicycles
                                        </NavLink>
                                    </li>
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}/admin/show/orders`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            All Orders
                                        </NavLink>
                                    </li>
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}/admin/makeadmin`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            Make Admin
                                        </NavLink>
                                    </li>
                                    <span className="w-100 d-block border border-2 border-top" ></span>
                                </>
                            }
                            {
                                !isAdmin && <>
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}/user/show/orders`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            My Orders
                                        </NavLink>
                                    </li>
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}/user/payments`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            Pay
                                        </NavLink>
                                    </li>
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}/user/add/reviews`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            Add Reviews
                                        </NavLink>
                                    </li>
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}/user/show/reviews`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            All Reviews
                                        </NavLink>
                                    </li>
                                </>
                            }
                            <li className="bg-info mb-1 text-center">
                                <NavLink onClick={logOut} className="nav-link text-light"
                                    to="/"
                                    activeStyle={{
                                        fontWeight: "bold",
                                        color: "#636"
                                    }}>
                                    LogOut
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="col-8 col-md-9">
                        <Switch>
                            <Route exact path={path}>
                                <DashBoardHome></DashBoardHome>
                            </Route>
                            <AdminRoute path={`${path}/admin/add/bycycle`}>
                                <AddBicycle></AddBicycle>
                            </AdminRoute>
                            <AdminRoute path={`${path}/admin/show/bicycles`}>
                                <AllBicycles></AllBicycles>
                            </AdminRoute>
                            <AdminRoute path={`${path}/admin/show/orders`}>
                                <AllOrders></AllOrders>
                            </AdminRoute>
                            <AdminRoute path={`${path}/admin/makeadmin`}>
                                <MakeAdmin></MakeAdmin>
                            </AdminRoute>
                            <Route path={`${path}/user/show/orders`}>
                                <MyOrders></MyOrders>
                            </Route>
                            <Route path={`${path}/user/add/reviews`}>
                                <AddReviews></AddReviews>
                            </Route>
                            <Route path={`${path}/user/show/reviews`}>
                                <MyReviews></MyReviews>
                            </Route>
                            <Route path={`${path}/user/payments`}>
                                <Pay></Pay>
                            </Route>
                        </Switch>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Dashboard;