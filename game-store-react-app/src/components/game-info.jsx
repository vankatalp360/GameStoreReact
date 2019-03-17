import React, { Component, Fragment } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import GamesService from '../services/games-service';
import Trailer from './trailer';

class GameInfo extends Component {
    constructor (props) {
      super(props);

      this.state = {
        showTrailer: false,
        showDescription: false
      };
    }
    static service = new GamesService();

    addToCart = () => {
      const { game } = this.props;

      GameInfo.service.addToCart(game);
    }

    showTrailer = () => {
      this.setState({showTrailer: true});
      this.setState({showDescription: false});
    }
    
    showDescription = () => {
      this.setState({showTrailer: false});
      this.setState({showDescription: true});
    }

    render() {

      const {game} = this.props;

      return (
        <Fragment>
          <div className='row space-top'>
          <div className='col-md-4'>
            <div className='card text-white bg-primary'>
              <div className='card-body bg-light'>
                <blockquote className='card-blockquote'>
                <Carousel>
                  {
                    game.images.map(image => (
                      <div key={image}>
                          <img src={image} alt={game.title}/>
                      </div>
                  ))
                  }
                </Carousel>
                </blockquote>
              </div>
            </div>
            </div>
          <div className='col-md-4'>
            <p><span className='light-blue-text'>Developer</span>: {game.developer}</p>
            <p><span className='light-blue-text'>Publisher</span>: {game.publisher}</p>
            <p><span className='light-blue-text'>Genres</span>: {game.genres.join(', ')}</p>
            <p><span className='light-blue-text'>Languages</span>: {game.languages.join(', ')}</p>
            <p><span className='light-blue-text'>Price</span>: ${game.price.toFixed(2)}</p>
            <p><span className='light-blue-text'>Likes</span>: {game.likes.length}</p>
            <button type="button" className='btn btn-primary btn-sm' >Like</button>
            <button type="button" className='btn btn-warning btn-sm' onClick={this.addToCart}>Order</button>
            <button type="button" className='btn btn-info btn-sm' onClick={this.showTrailer}>View Trailer</button>
            <button type="button" className='btn btn-info btn-sm' onClick={this.showDescription}>View Description</button>
          </div>
          <div className='col-md-4'>
                { 
                  (<Fragment>
                      {this.state.showTrailer ? <Trailer game={game} /> : null}
                      {this.state.showDescription
                        ? 
                        <p><span className='light-blue-text'>Description</span>: {game.description}</p> 
                        : null}
                  </Fragment>)
                }
          </div>
        </div>
      </Fragment>
    );
    }
};

export default GameInfo;