import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/userAuthContext';


const ProtectedRoute = ({children}: { children: JSX.Element }) => {

    const { user } = useUserAuth();
    if (!user) {
        return <Navigate to='/' />
    }
    return children
}

export default ProtectedRoute;
