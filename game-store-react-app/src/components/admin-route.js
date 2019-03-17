import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../components/contexts/user-context';

const AdminRoute = ({ isLoggedIn, roles, ...otherProps }) => {

    if(!isLoggedIn) {
        return <Redirect to='/login' />
    }
    
    if(!roles.includes("Admin")) {
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