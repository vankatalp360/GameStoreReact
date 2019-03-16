import React from 'react';
import { Link } from 'react-router-dom';

const GameInfo = ({ game, username }) => {
    return (
        <div className='row space-top'>
        <div className='col-md-4'>
          <div className='card text-white bg-primary'>
            <div className='card-body bg-light'>
              <blockquote className='card-blockquote'>
                <img src={game.images[0]} alt={game.title} className='card-image' />
              </blockquote>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <p><span className='light-blue-text'>Developer</span>: {game.developer}</p>
          <p><span className='light-blue-text'>Publisher</span>: {game.publisher}</p>
          <p><span className='light-blue-text'>Description</span>: {game.description}</p>
          <p><span className='light-blue-text'>Genres</span>: {game.genres.join(', ')}</p>
          <p><span className='light-blue-text'>Languages</span>: {game.languages.join(', ')}</p>
          <p><span className='light-blue-text'>Price</span>: ${game.price.toFixed(2)}</p>
          <p><span className='light-blue-text'>Likes</span>: {game.likes.length}</p>
          <button className='btn btn-primary btn-sm' >Like</button>
          <button className='btn btn-warning btn-sm' >Order</button>
        </div>
      </div>
    );
};

export default GameInfo;