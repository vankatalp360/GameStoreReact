import React, { Fragment } from 'react';
import { NavLink, Link, Switch } from 'react-router-dom';
import { UserConsumer } from '../components/contexts/user-context';

const Header = ({ isLoggedIn, logout }) => {
    return (
        <header>
            <nav className="navbar-menu">
                <NavLink to="/" activeClassName="active">Book Store</NavLink>
                <NavLink to="/" activeClassName="active" aria-current="page">Home</NavLink>
                {
                    isLoggedIn
                    ? 
                    <Fragment>
                        <NavLink to="/store" activeClassName="active">Store</NavLink>
                        <NavLink to="/orders" activeClassName="active">My Orders</NavLink>
                        <NavLink to="/cart" activeClassName="active">Cart</NavLink>
                        <NavLink to='/' onClick={logout}>Logout</NavLink>
                    </Fragment>
                    : 
                    <Fragment>
                        <NavLink to="/login">Login</NavLink> 
                        <NavLink to="/register">Register</NavLink>
                    </Fragment>
                }
            </nav>
        </header>
    );
}

const HeaderWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn }) => (
                    <Header {...props} isLoggedIn={isLoggedIn} />
                )
            }
        </UserConsumer>
    )
}

export default HeaderWithContext;