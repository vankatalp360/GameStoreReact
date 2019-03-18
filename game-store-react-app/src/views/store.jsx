import React, { Component, Fragment } from "react";
import GameCard from '../components/game-card';
import GamesService from "../services/games-service";

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [],
            query: ""
        }
        this.input = React.createRef();
    }
    static service = new GamesService();

    submitQuery = (event) => {
        event.preventDefault();
        const query = this.input.current.value;
        this.setState({query})
    }
    
    
    render () {
        const { games, query } = this.state;
        const filterGames = games.filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));
        console.log(filterGames);

        return (
            <Fragment>
            <main>
                <div className='container'>
                    <div className='row space-top'>
                        <div className='col-md-12'>
                            <h1 className='jumbotron-heading text-center white'>Store</h1>
                            <form onSubmit={this.submitQuery} className='form-inline md-form form-sm active-cyan active-cyan-2'>
                            <i className='fa fa-search' aria-hidden='true' />
                            <input
                                className='form-control form-control-sm ml-3 w-75'
                                type='text'
                                placeholder='Search for the game you are looking for...'
                                aria-label='Search'
                                id='query'
                                name='query' 
                                ref={this.input}/>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className="row-12">
                        <div className="card-deck space-top">
                            {
                                filterGames.map(game => (
                                    <GameCard key={game._id} game={game} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
        )
    }
    
    async componentDidMount() {
        try {
            const games = await Store.service.getTopRatedGames();
            
            this.setState({ games });
        } catch (error) {
            console.error(error);
        }
    }
 }
 


export default Store;