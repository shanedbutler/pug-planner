const apiUrl = "https://localhost:7066"

/**
 * Fetches all games from API
 * @returns An array of game objects
 */
export const fetchGames = async () => {
    const response = await fetch(`${apiUrl}/api/game/get`);
    const games = await response.json();
    return games;
};

/**
 * Fetches single game from API by game id pk
 * @param {int} id 
 * @returns A game object
 */
export const fetchGame = async (id) => {
    const response = await fetch(`${apiUrl}/api/game/get/${id}`);
    const game = await response.json();
    return game;
};
