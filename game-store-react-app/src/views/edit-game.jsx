import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GameService from '../services/games-service'
import { toast } from 'react-toastify';

class EditGame extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            genresAsText: '',
            developer: '',
            trailer: '',
            publisher: '',
            languagesAsText: '',
            description: '',
            price: '',
            imagesAsText: '',
            isLoading: false,
            error: ''
        }
    }

    static service = new GameService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const { title,
                genresAsText,
                developer,
                trailer,
                publisher,
                languagesAsText,
                description,
                price,
                imagesAsText, } = this.state;

        const credentials = {
                title,
                genres: genresAsText.split(/[\s,]+/g),
                developer,
                trailer,
                publisher,
                languages: languagesAsText.split(/[\s,]+/g),
                description,
                price,
                images: imagesAsText.split(/[\s,]+/g)
        }
        const id = this.props.match.params.id;

        this.setState({
            error: ''
        }, async () => {
            try {
                const result = await EditGame.service.edit(id, credentials);
    
                if (!result.success) {
                    const errors = Object.values(result.errors).join(' ');

                    throw new Error(errors);
                }
                toast.success("Game was edited Successfully");

                this.setState({
                    isCreated: true
                });
    
            } catch (error) {
                toast.error(error.toString());
            }
        });
    }

    render () {
        const { title, genresAsText, developer, trailer, publisher, languagesAsText, description, price, imagesAsText, isCreated, error } = this.state;
        
        if (isCreated) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div className="form-wrapper">
            {
                error.length
                    ? <div>Something went wrong: {error}</div>
                    : null
            }
                <h1>Edit Game</h1>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title"
                        placeholder="Enter game title" 
                        value={title}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input 
                        type="text" 
                        name="description" 
                        id="description"
                        placeholder="Enter game description" 
                        value={description}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="genresAsText">Genres</label>
                    <input 
                        type="text" 
                        name="genresAsText" 
                        id="genresAsText"
                        placeholder="Enter genres for the game. Put a comma between them" 
                        value={genresAsText}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="languages">Languages</label>
                    <input 
                        type="text" 
                        name="languagesAsText" 
                        id="languagesAsText"
                        placeholder="Enter languages for the game. Put a comma between them" 
                        value={languagesAsText}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="images">Images</label>
                    <input 
                        type="text" 
                        name="imagesAsText" 
                        id="imagesAsText"
                        placeholder="Enter images for the game. Put a comma between them" 
                        value={imagesAsText}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="developer">Developer</label>
                    <input 
                        type="text" 
                        name="developer"
                        id="developer" 
                        placeholder="Enter game developer" 
                        value={developer}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="trailer">Trailer</label>
                    <input 
                        type="text" 
                        name="trailer" 
                        id="trailer"
                        placeholder="Enter game trailer" 
                        value={trailer}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="publisher">Publisher</label>
                    <input 
                        type="text" 
                        name="publisher" 
                        id="publisher"
                        placeholder="Enter game publisher" 
                        value={publisher}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input 
                        type="number" 
                        name="price" 
                        id="price"
                        placeholder="Enter game price" 
                        value={price}
                        onChange={this.handleChange}/>
                </div>
                <input type="submit" value="Edit"/>
                </form>
            </div>
        );
    }

    async componentDidMount() {
        try {
            const gameId = this.props.match.params.id;
            const games = await EditGame.service.getTopRatedGames();
            const game = games.find(game => game._id === gameId);
            
            this.setState({
                    title: game.title,
                    genresAsText: game.genres.join(", "),
                    developer: game.developer,
                    trailer: game.trailer,
                    publisher: game.publisher,
                    languagesAsText: game.languages.join(", "),
                    description: game.description,
                    price: game.price,
                    imagesAsText: game.images.join(", "),
                    isLoading: false,
                    error: ''
                });
        } catch (error) {
            console.error(error);
        }
    }
}


export default EditGame;