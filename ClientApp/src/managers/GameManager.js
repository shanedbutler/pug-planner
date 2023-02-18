import { postOption, putOption } from './FetchOptions';

const apiUrl = 'https://localhost:7066';

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

/**
 * Post a new game to API and get it back
 * @param {object} game
 * @returns A game object
 */
export const fetchPostGame = async (gameBody) => {
   const response = await fetch(`${apiUrl}/api/game/`, postOption(gameBody));
   const game = await response.json();
   return game;
};

/**
 * Put edited game to API and get it back
 * @param {object} game
 * @returns A game object
 */
export const fetchPutGame = async (gameBody) => {
   const response = await fetch(`${apiUrl}/api/game/`, putOption(gameBody));
   const game = await response.json();
   return game;
};

/**
 * Delete game by id from database
 * @param {int} gameId
 */
export const fetchDeleteGame = async (gameId) => {
   const response = await fetch(`${apiUrl}/api/game/delete/?id=${gameId}`, {
      method: 'DELETE',
   });
   return response;
};
