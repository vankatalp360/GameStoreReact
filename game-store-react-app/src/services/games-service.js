import { get, post } from '../data/crud'

class GamesService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/game';
        this.allGamesUrl = `${this.baseUrl}/all`
        this.createGameUrl = `${this.baseUrl}/create`
    }

    getTopRatedGames() {
        return get(this.allGamesUrl);
    }

    create(credentials) {
        return post(this.createGameUrl, credentials);
    }
}

export default GamesService;