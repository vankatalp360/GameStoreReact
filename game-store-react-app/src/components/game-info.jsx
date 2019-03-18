import React, { Component, Fragment } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import GamesService from '../services/games-service';
import Trailer from './trailer';
import { UserConsumer } from './contexts/user-context';
import { toast } from 'react-toastify';

class GameInfo extends Component {
    constructor (props) {
      super(props);

      this.state = {
        showTrailer: false,
        showDescription: false,
        isLike: false,
        likes: 0
      };
    }
    static service = new GamesService();

    addToCart = () => {
      const { game } = this.props;

      GameInfo.service.addToCart(game);
    }

    like = () => {
      const { game } = this.props;

      GameInfo.service.like(game._id);

      this.setState({isLike: true, likes: this.state.likes + 1});
    }

    unLike = () => {
      const { game } = this.props;

      GameInfo.service.unLike(game._id);

      this.setState({isLike: false, likes: this.state.likes - 1});
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
      const {isLike, likes} = this.state;

      return (
        <Fragment>
        <div className='row space-top'>
          <div className='col-md-6'>
            <div className='card text-white'>
              <div className='card-body bg-light'>
                <blockquote className='card-blockquote'>
                <Carousel showThumbs={false}>
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
          <div className='col-md-6'>
            <p><span className='light-blue-text'>Developer</span>: {game.developer}</p>
            <p><span className='light-blue-text'>Publisher</span>: {game.publisher}</p>
            <p><span className='light-blue-text'>Genres</span>: {game.genres.join(', ')}</p>
            <p><span className='light-blue-text'>Languages</span>: {game.languages.join(', ')}</p>
            <p><span className='light-blue-text'>Price</span>: ${game.price.toFixed(2)}</p>
            <p><span className='light-blue-text'>Likes</span>: {likes}</p>
            
            {
              isLike
              ?
              <button type="button" className='btn btn-primary btn-sm m-1' onClick={this.unLike} >unLike</button>
              :
              <button type="button" className='btn btn-primary btn-sm m-1' onClick={this.like}>Like</button>  
            }

            <button type="button" className='btn btn-warning btn-sm m-1' onClick={this.addToCart}>Order</button>
            <button type="button" className='btn btn-info btn-sm m-1' onClick={this.showTrailer}>View Trailer</button>
            <button type="button" className='btn btn-info btn-sm m-1' onClick={this.showDescription}>View Description</button>
          </div>
          
        </div>
        <div className='row mt-4 mb-5'>
          <div className='col-md-8 offset-md-2'>
                { 
                  (<Fragment>
                      {this.state.showTrailer ? <Trailer game={game} /> : null}
                      {this.state.showDescription
                        ? 
                        <p align="center"><span className='light-blue-text'>Description</span>: {game.description}</p> 
                        : null}
                  </Fragment>)
                }
          </div>
        </div>
      </Fragment>
    );
    }

    componentDidMount() {
      const gameLikes = this.props.game.likes;
      const { username } = this.props;
      if(gameLikes.includes(username)){
        this.setState({isLike: true, likes: gameLikes.length})
      }
      this.setState({likes: gameLikes.length})
    }
};

const GameInfoWithContext = (props) => {
  return (
      <UserConsumer>
          {
              ({ username }) => (
                  <GameInfo {...props} username={username} />
              )
          }
      </UserConsumer>
  )
}

export default GameInfoWithContext;