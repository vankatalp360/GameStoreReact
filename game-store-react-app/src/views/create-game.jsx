import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GameService from '../services/games-service'

class CreateGame extends Component {
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
            isCreated: false,
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

        this.setState({
            error: ''
        }, async () => {
            try {
                if(credentials.password !== credentials.confirmPassword) {
                    throw new Error("Password and Confirm Password doesnt match!");
                }
                const result = await CreateGame.service.create(credentials);
    
                if (!result.success) {
                    const errors = Object.values(result.errors).join(' ');

                    throw new Error(errors);
                }

                this.setState({
                    isCreated: true
                });
    
            } catch (error) {
                this.setState({
                    error: error.message,
                });
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
                <h1>Create New Game</h1>
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
                <input type="submit" value="Create"/>
                </form>
            </div>
        );
    }
}


export default CreateGame;