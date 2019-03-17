import React, { Component } from "react";
import { Link } from 'react-router-dom';
import LandingMessage from "../components/landing-message";
import TopRatedGameCards from "../components/top-rated-game-cards";
import { UserConsumer } from "../components/contexts/user-context";

const Home = ({ username, isLoggedIn, isAdmin }) => {
    return (
            <main>
                <div className="welcome-wrapper">
                    {
                        isLoggedIn 
                    ?
                    <LandingMessage message={`Welcome to our book store, ${username}!`}>
                        <p>
                            <Link to="/store">Go To Store</Link>  
                           { isAdmin
                            ?
                            <Link to="/admin/orders/pending">View all pending orders</Link>
                            :
                            <Link to="/orders">View your orders</Link>
                           }
                        </p>
                    </LandingMessage>
                    :
                    null
                    }
                    <h2>Most recent games</h2>
                    <TopRatedGameCards />
                </div>
            </main>
    )
 }

 const HomeWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ username, isLoggedIn, isAdmin }) => (
                    <Home {...props} username={username} isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
                )
            }
        </UserConsumer>
    )
}

export default HomeWithContext;