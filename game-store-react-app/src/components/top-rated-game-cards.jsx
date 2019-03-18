import React, { Fragment, Component } from 'react';
import GameCard from '../components/game-card';
import Loading from '../components/loading';
import GamesService from '../services/games-service';

class TopRatedGameCards extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            games: [],
            isLoading: false,
        }
    }

    static service = new GamesService();

    render() {
        const { games, isLoading } = this.state;

        if(isLoading) {
            return <Loading />
        }

        if (!games.length && !isLoading) {
            return (
                <div>
                    <br/>
                    <h2 className="white">No games!</h2>    
                </div>
            );
        }

        return (
            <Fragment>
                <div className="row space-top m-5">
                {
                    games.map(game => (
                        <GameCard key={game._id} game={game} />
                    ))
                }
                </div>
            </Fragment>
        );
    }

    async componentDidMount() {
        try {
            const games = await TopRatedGameCards.service.getTopRatedGames();
            
            this.setState({ games });
        } catch (error) {
            console.error(error);
        }
    }
};

export default TopRatedGameCards;