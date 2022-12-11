import { postOption } from "./FetchOptions";
import { getCurrentUser } from "./UserManager";

const apiUrl = "https://localhost:7066"

export const postUserToRoster = async (gameId) => {

    const userId = getCurrentUser().id;

    const rosterEntry = {
        userProfileId: userId,
        gameId: gameId
    };

    const response = await fetch(`${apiUrl}/api/roster`, postOption(rosterEntry))
    const rosterReturnedEntry = await response.json();
    return rosterReturnedEntry;
};