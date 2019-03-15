import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GamesService from '../services/games-service'

class GameCard extends Component {
    addToCart = () => {
        const { game } = this.props;

        GameCard.service.addToCart(game);
    }
    static service = new GamesService();
    
    render () {
        const { game } = this.props;

        return (
            <div className="card col-4">
                <img className="card-img-top card-image" 
                    src={game.images[0]}
                    alt={game.title}
                />
                <div className="card-body">
                    <h5 className="card-title">
                        {game.title}
                    </h5>
                    <p className="card-text">
                        {game.description}
                    </p>
                </div>
                <div className="card-footer">
                    <small className="text-muted"></small>
                    <Link 
                        type="button" 
                        className="btn btn-primary float-right btn-sm"
                        to={`/details/${game._id}`}
                    >
                        Details
                    </Link>
                <button 
                    type="button" 
                    className="btn btn-warning float-right btn-sm"  
                    onClick={this.addToCart}
                >
                    Order
                </button>
                </div>
            </div>
        );
    }
};

export default GameCard;