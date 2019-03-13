import { get } from '../data/crud'

class GamesService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/game';
        this.allGamesUrl = `${this.baseUrl}/all`
    }

    getTopRatedGames() {
        return get(this.allGamesUrl);
    }
}

export default GamesService;