import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../components/contexts/user-context';

const AuthorizeRoute = ({ isLoggedIn, ...otherProps }) => {

    if(!isLoggedIn) {
        return <Redirect to='/login' />
    }

    return <Route { ...otherProps }/>
}

const AuthorizeRouteWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn}) => (
                    <AuthorizeRoute {...props} isLoggedIn={isLoggedIn} />
                ) 
            }
        </UserConsumer>
    )
} 

export {
    AuthorizeRoute   
}
export default AuthorizeRouteWithContext;