import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import GamesService from '../services/games-service';

class GameCart extends Component {

    remove = () => {
        const { game } = this.props;
        this.props.removeGame(game)
    }
   render () {

       const { game } = this.props;

        return (
            <tr>
                <td data-th="Product">
                <div className="row">
                    <div className="col-sm-4 hidden-xs">
                        <img 
                            src={game.images[0]} 
                            alt={game.title} 
                            className="cart-image"/>
                    </div>
                    <div className="col-sm-8">
                        <h4 className="nomargin">{game.title}</h4>
                        <p><strong>Genres:</strong> {game.genres.join(', ')}</p>
                        <p><strong>Languages:</strong> {game.languages.join(', ')}</p>
                    </div>
                </div>
                </td>
                <td data-th="Price">${game.price.toFixed(2)}</td>
                    <td data-th="Subtotal" className="text-center">${game.price.toFixed(2)}</td>
                    <td className="actions" data-th="">
                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={this.remove}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        );
   }
};

export default GameCart;