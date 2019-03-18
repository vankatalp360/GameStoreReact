import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../components/contexts/user-context';
import { toast } from 'react-toastify';

const AdminRoute = ({ isLoggedIn, roles, ...otherProps }) => {

    if(!isLoggedIn) {
        toast.info("Please login in");
        return <Redirect to='/login' />
    }
    
    if(!roles.includes("Admin")) {
        toast.error("You are not authorized to see this page");
        return <Redirect to='/' />
    }

    return <Route { ...otherProps }/>
}

const AdminRouteWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn, roles}) => (
                    <AdminRoute {...props} isLoggedIn={isLoggedIn} roles={roles} />
                ) 
            }
        </UserConsumer>
    )
} 

export {
    AdminRoute   
}
export default AdminRouteWithContext;