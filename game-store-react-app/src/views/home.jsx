import React, { Component } from "react";
import { Link } from 'react-router-dom';
import LandingMessage from "../components/landing-message";
import TopRatedGameCards from "../components/top-rated-game-cards";
import { UserConsumer } from "../components/contexts/user-context";

const Home = ({ username }) => {
    return (
            <main>
                <div className="welcome-wrapper">
                    <LandingMessage message={`Welcome to our book store, ${username}!`}>
                        <p>
                            <Link to="/store">Go To Store</Link>
                            <Link to="/orders">View your orders</Link>
                        </p>
                    </LandingMessage>
                    <TopRatedGameCards />
                </div>
            </main>
    )
 }

 const HomeWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ username }) => (
                    <Home {...props} username={username} />
                )
            }
        </UserConsumer>
    )
}

export default HomeWithContext;