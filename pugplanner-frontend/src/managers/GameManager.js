const apiUrl = "https://localhost:7066"

/**
 * Get all games from API
 * @returns An array of game objects
 */
export const fetchGames = async () => {
    const response = await fetch(`${apiUrl}/api/game/get`);
    const games = await response.json();
    return games;
};

/**
 * Get single game from API by game id pk
 * @param {int} gameId 
 * @returns A game object
 */
export const fetchGame = async (gameId) => {
    const response = await fetch(`${apiUrl}/api/game/get/${gameId}`);
    const game = await response.json();
    return game;
};
