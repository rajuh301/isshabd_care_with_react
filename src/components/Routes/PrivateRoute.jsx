import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';


const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    console.log('User in private route', user);
    

    if(loading){
        return <progress className="progress w-56"></progress>
    }
    
    if(user){
        return children;
    }
    

    return <Navigate state={{from: location}} to='/login' replace></Navigate>
};


export default PrivateRoute;

/**
 * ---------------------------
 *          Setup
 * ---------------------------
 * 
 * 1. Check user is logged in or not.
 * 2. if user is logged in, then allow them visit the route.
 * 3. Else redirect the user to the login page.
 * 4. Setup the private route.
 * 5. Handle loading.
 * 
 * */ 