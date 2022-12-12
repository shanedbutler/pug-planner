import { postOption } from "./FetchOptions";
import { getCurrentUser } from "./UserManager";

const apiUrl = "https://localhost:7066"

/**
 * Gets current player count and max players by gameId
 * @param {int} gameId 
 * @returns rosterGameCount object
 */
export const fetchGameRosterCount = async (gameId) => {
    const response = await fetch(`${apiUrl}/api/roster/getCount?gameId=${gameId}`);
    const rosterGameCount = await response.json();
    return rosterGameCount;
};

/**
 * POSTs new roster entry to database
 * Entry is made for current user with passed in gameId
 * @param {int} gameId 
 * @returns Newly created roster object
 */
export const postUserToRoster = async (gameId) => {

    const userId = getCurrentUser().id;

    const rosterEntry = {
        userProfileId: userId,
        gameId: gameId
    };

    const response = await fetch(`${apiUrl}/api/roster`, postOption(rosterEntry));
    const rosterReturnedEntry = await response.json();
    return rosterReturnedEntry;
};
