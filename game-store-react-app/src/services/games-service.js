import { get, post, remove } from '../data/crud'
import { toast } from 'react-toastify';

class GamesService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/game';
        this.allGamesUrl = `${this.baseUrl}/all`
        this.createGameUrl = `${this.baseUrl}/create`
        this.editGameUrl = `${this.baseUrl}/edit/`
        this.deleteGameUrl = `${this.baseUrl}/delete/`
        this.likeGameUrl = `${this.baseUrl}/like/`
        this.unlikeGameUrl = `${this.baseUrl}/unlike/`
    }

    getTopRatedGames() {
        return get(this.allGamesUrl);
    }

    create(credentials) {
        return post(this.createGameUrl, credentials);
    }
    
    edit(id, credentials) {
        return post(`${this.editGameUrl}${id}`, credentials,);
    }
    
    delete(id, credentials) {
        return remove(`${this.deleteGameUrl}${id}`, credentials);
    }

    like(id, credentials) {
        return post(`${this.likeGameUrl}${id}`, credentials);
    }

    unLike(id, credentials) {
        return post(`${this.unlikeGameUrl}${id}`, credentials);
    }

    addToCart = (game) => {
        let gamesAsJson = window.localStorage.getItem("games") || JSON.stringify([]);
        const games = JSON.parse(gamesAsJson);
        games.push(game);
        window.localStorage.setItem("games", JSON.stringify(games));
        
        toast.success(`${game.title} was added to your cart`);
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