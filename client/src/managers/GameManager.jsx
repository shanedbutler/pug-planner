import { camelCaseKeys } from '../supabaseUtils/casingUtils';
import { supabase } from '../supabaseUtils/supabaseClient';
import { getToken } from './AuthManager';
import { deleteOption, getOption, postOption, putOption } from './FetchOptions';

const apiUrl = 'https://localhost:7066';

/**
 * Get all games from API
 * @returns An array of game objects
 */
export const fetchGames = async () => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/game/get`, getOption(token));
   const games = await response.json();
   return games;
};

/**
 * Get all games from supabase
 * @returns Supabase response object
 */
export const fetchAllGames = async () => {
   const { data, error } = await supabase
      .from('games')
      .select();

   if (!error) {
      const casedData = camelCaseKeys(data);
      return Object.values(casedData);
   }
   else {
      console.error(error);
   }
}

/**
 * Get upcoming games from supabase
 * @returns Supabase response object
 */
export const fetchUpcomingGames = async () => {
   const { data, error } = await supabase
      .from('games')
      .select(`
      *,
      primary_host:primary_host_id(id, full_name),
      secondary_host:secondary_host_id(id, full_name),
      current_players:game_roster(count)
      rosterProfile:profiles(*)
      `)
      .gt('game_date', new Date().toISOString());

   if (!error) {
      const casedData = camelCaseKeys(data);
      return Object.values(casedData);
   }
   else {
      console.error(error);
   }
}

/**
 * Get past games from supabase
 * @returns Supabase response object
 */
export const fetchPastGames = async () => {
   const { data, error } = await supabase
      .from('games')
      .select(`
         *,
         primary_host:primary_host_id(id, full_name),
         secondary_host:secondary_host_id(id, full_name),
         rosterCount:game_roster(count)
      `)
      .lt('game_date', new Date().toISOString());

   if (!error) {
      const casedData = camelCaseKeys(data);
      return Object.values(casedData);
   }
   else {
      console.error(error);
   }
}

/**
 * Get a single game with player data from supabase by game id pk
 * @param {int} gameId
 * @returns Supabase response object
 */
export const fetchGameById = async (gameId) => {
   const { data, error } = await supabase
      .from('games')
      .select(`
         *,
         primary_host:primary_host_id(id, full_name, first_name, phone),
         secondary_host:secondary_host_id(id, full_name, first_name, phone),
         game_roster(
            *, 
            profile:user_profile_id(
               *, 
               primary_position:primary_position_id(*), 
               secondary_position:secondary_position_id(*)
            )
         )
      `)
      .eq('id', gameId);

   if (!error) {
      const casedData = camelCaseKeys(data);
      return (casedData[0]);
   }
   else {
      console.error(error);
   }
}

/**
 * Get single game from API by game id pk
 * @param {int} gameId
 * @returns A game object
 */
export const fetchGame = async (gameId) => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/game/get/${gameId}`, getOption(token));
   const game = await response.json();
   return game;
};

/**
 * Post a new game to API and get it back
 * @param {object} game
 * @returns A game object
 */
export const fetchPostGame = async (gameBody) => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/game/`, postOption(gameBody, token));
   const game = await response.json();
   return game;
};

/**
 * Put edited game to API and get it back
 * @param {object} game
 * @returns A game object
 */
export const fetchPutGame = async (gameBody) => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/game/`, putOption(gameBody, token));
   const game = await response.json();
   return game;
};

/**
 * Delete game by id from database
 * @param {int} gameId
 */
export const fetchDeleteGame = async (gameId) => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/game/delete/?id=${gameId}`, deleteOption(token));
   return response;
};
