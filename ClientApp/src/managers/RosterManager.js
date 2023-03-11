import { getToken } from './AuthManager';
import { deleteOption, getOption, postOption } from './FetchOptions';
import { getLocalUser } from './UserManager';

const apiUrl = 'https://localhost:7066';

/**
 * Gets current player count and max players by gameId
 * @param {int} gameId
 * @returns rosterGameCount object
 */
export const fetchGameRosterCount = async (gameId) => {
   const token = await getToken();
   const response = await fetch(
      `${apiUrl}/api/roster/getCount?gameId=${gameId}`,
      getOption(token)
   );
   const rosterGameCount = await response.json();
   return rosterGameCount;
};

/**
 * Gets count of user's appearances in the game roster table
 * @param {int} userId
 * @returns rosterUserCount object
 */
export const fetchUserRosterCount = async (userId) => {
   const token = await getToken();
   const response = await fetch(
      `${apiUrl}/api/roster/getUserCount?userId=${userId}`,
      getOption(token)
   );
   const rosterUserCount = await response.json();
   return rosterUserCount;
};

/**
 * POSTs new roster entry to database
 * Entry is made for current user with passed in gameId
 * @param {int} gameId
 * @returns Newly created roster object
 */
export const postUserToRoster = async (gameId) => {
   const userId = getLocalUser().id;
   const rosterEntry = {
      userProfileId: userId,
      gameId: gameId,
   };
   
   const token = await getToken();
   const response = await fetch(
      `${apiUrl}/api/roster`,
      postOption(rosterEntry, token)
   );
   const rosterReturnedEntry = await response.json();
   return rosterReturnedEntry;
};

/**
 * DELETEs from database all current users roster entries that match the gameId param
 * @param {int} gameId
 */
export const deleteUserFromRoster = async (gameId) => {
   const userId = getLocalUser().id;

   const token = await getToken();
   const response = await fetch(
      `${apiUrl}/api/roster/delete?userId=${userId}&gameId=${gameId}`,
      deleteOption(token)
   );
   return response;
};
