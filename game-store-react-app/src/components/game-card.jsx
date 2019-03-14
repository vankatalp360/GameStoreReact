import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ id, images, title, description }) => {
    return (
        <div className="card col-4">
            <img className="card-img-top card-image" 
                src={images[0]}
                alt={title}
            />
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                </h5>
                <p className="card-text">
                    {description}
                </p>
            </div>
            <div className="card-footer">
                <small className="text-muted"></small>
                <Link 
                    type="button" 
                    className="btn btn-primary float-right btn-sm"
                    to={`/details/${id}`}
                >
                    Details
                </Link>
            <button 
                type="button" 
                className="btn btn-warning float-right btn-sm"  
            >
                Order
            </button>
            </div>
        </div>
    );
};

export default GameCard;