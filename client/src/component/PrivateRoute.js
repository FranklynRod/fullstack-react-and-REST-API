import React from 'react'
import {useContext} from "react";
import UserContext from '../context/UserContext';
import { Navigate, Outlet, useLocation} from 'react-router-dom';

const PrivateRoute = () => {
    //imports users authenticated user info to allow user to access specific routes. If user doesn't have the authorization user will be routed to signin then previous location once signed in 
    const {authUser } = useContext(UserContext);
    const location = useLocation();
if (authUser){
    return <Outlet/>
} else{
    return <Navigate to="/signin" state={{from:location.pathname}}/>
}
}

export default PrivateRoute