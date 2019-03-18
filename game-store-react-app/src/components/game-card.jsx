import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GamesService from '../services/games-service'
import { UserConsumer } from './contexts/user-context';

class GameCard extends Component {
    addToCart = () => {
        const { game } = this.props;

        GameCard.service.addToCart(game);
    }
    static service = new GamesService();
    
    render () {
        const { game } = this.props;
        const { isLoggedIn, isAdmin } = this.props;

        return (
            <div className="col-md-3 mt-3 mb-3 d-flex">
                <div className="card colorCard card-body flex-fill">
                    <img className="card-img-top card-image" 
                        src={game.images[0]}
                        alt={game.title}
                    />
                    <div className="card-body">
                        <h5 className="card-title">
                            {game.title}
                        </h5>
                        <p className="card-text">
                            {game.description.slice(0, 50)}...
                        </p>
                    </div>
                    {
                        isLoggedIn
                        ?
                        (isAdmin
                            ?
                            <div className="card-footer">
                                <small className="text-muted"></small>
                                <Link 
                                    type="button" 
                                    className="btn btn-primary float-right btn-sm m-1"
                                    to={`/admin/game/edit/${game._id}`}
                                >
                                    Edit
                                </Link>
                                <Link 
                                    type="button" 
                                    className="btn btn-danger float-right btn-sm m-1"  
                                    to={`/admin/game/delete/${game._id}`}
                                >
                                    Delete
                                </Link>
                                </div>
                            :
                            <div className="card-footer">
                                <small className="text-muted"></small>
                                <Link 
                                    type="button" 
                                    className="btn btn-primary float-right btn-sm m-1"
                                    to={`/details/${game._id}`}
                                >
                                    Details
                                </Link>
                                <button 
                                    type="button" 
                                    className="btn btn-warning float-right btn-sm m-1"  
                                    onClick={this.addToCart}
                                >
                                    Order
                                </button>
                            </div>)
                        :
                        null
                    }
                </div>
            </div>
        );
    }
};

const GameCardWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => (
                    <GameCard {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
                )
            }
        </UserConsumer>
    )
}

export default GameCardWithContext;