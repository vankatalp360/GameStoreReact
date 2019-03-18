import React, { Fragment } from 'react';
import { NavLink, Link, Switch } from 'react-router-dom';
import { UserConsumer } from '../components/contexts/user-context';

const Header = ({ isLoggedIn, isAdmin, logout }) => {
    return (
        <header>
            <nav className="navbar-menu">
                <NavLink to="/" activeClassName="active">Game Store</NavLink>
                <NavLink to="/" activeClassName="active" aria-current="page">Home</NavLink>
                {
                    isLoggedIn
                    ? 
                    <Fragment>
                        <NavLink to="/store" activeClassName="active">Store</NavLink>
                        {isAdmin
                        ?
                        <Fragment>
                            <NavLink to="/admin/create" activeClassName="active">Create New Game</NavLink>
                            <NavLink to="/admin/orders/pending" activeClassName="active">Pending Orders</NavLink>
                        </Fragment>
                        :
                        <Fragment>
                            <NavLink to="/orders" activeClassName="active">My Orders</NavLink>
                            <NavLink to="/cart" activeClassName="active">Cart</NavLink>
                        </Fragment>}
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
                ({ isLoggedIn, isAdmin }) => (
                    <Header {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                )
            }
        </UserConsumer>
    )
}

export default HeaderWithContext;