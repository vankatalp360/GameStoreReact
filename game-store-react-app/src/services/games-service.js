import { get, post } from '../data/crud'

class GamesService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/game';
        this.allGamesUrl = `${this.baseUrl}/all`
        this.createGameUrl = `${this.baseUrl}/create`
        this.detailsGame = `${this.baseUrl}/details/`
    }

    getTopRatedGames() {
        return get(this.allGamesUrl);
    }

    create(credentials) {
        return post(this.createGameUrl, credentials);
    }
    
    addToCart = (game) => {
        let gamesAsJson = window.localStorage.getItem("games") || JSON.stringify([]);
        const games = JSON.parse(gamesAsJson);
        games.push(game);
        window.localStorage.setItem("games", JSON.stringify(games));
    }

    removeFromCart = (game) => {
        let gamesAsJson = window.localStorage.getItem("games") || JSON.stringify([]);
        const games = JSON.parse(gamesAsJson);
        const index = games.findIndex((currentGame) => currentGame._id === game._id)
        games.splice(index, 1);
        window.localStorage.setItem("games", JSON.stringify(games));

        return true;
    }

    emptyCart = () => {
        window.localStorage.removeItem("games");
    }
}

export default GamesService;