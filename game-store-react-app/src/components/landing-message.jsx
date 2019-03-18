import React from 'react';

const LandingMessage = ({ message, children }) => {
    return (
        <div className="welcome">
            <h1 className="white">{message}</h1>
            {children}
        </div>
    );
};

export default LandingMessage