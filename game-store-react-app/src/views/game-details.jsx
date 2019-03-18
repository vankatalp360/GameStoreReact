import React, { Fragment, Component } from 'react';
import Info from '../components/game-info';
import Loading from '../components/loading';
import GamesService from '../services/games-service';
import { UserConsumer } from "../components/contexts/user-context";
import { toast } from 'react-toastify';

class GameDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
            game: {},
            isLoading: true,
        }
    }

    static service = new GamesService();

    render() {
        const { game, isLoading } = this.state;
        const { username } = this.props;

        if(isLoading) {
            return <Loading />
        }

        if (game === undefined && !isLoading) {
            return (
                <main>
                    <div>
                        <br/>
                        <h2 className="text-center white">Invalid game!</h2>    
                    </div>
                </main>
            );
        }

        return (
            <Fragment>
                <main>
                <div className='container white'>
                    <div className='row space-top mb-3'>
                        <div className='col-md-12'>
                            <h1 className="text-center mt-3">{game.title}</h1>
                        </div>
                    </div>
                    <Info
                        game={game}
                        username={username} />
                </div>
                </main>
            </Fragment>
        );
    }

    async componentDidMount() {
        try {
            const gameId = this.props.match.params.id;
            const games = await GameDetails.service.getTopRatedGames();
            const game = games.find(game => game._id === gameId);
            
            this.setState({ game, isLoading: false });
        } catch (error) {
            toast.error(error.toString());
        }
    }
};

const GameDetailsWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ username }) => (
                    <GameDetails {...props} username={username} />
                )
            }
        </UserConsumer>
    )
}

export default GameDetailsWithContext;