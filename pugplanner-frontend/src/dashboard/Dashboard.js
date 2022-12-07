import { useEffect, useState } from "react";
import { fetchGames } from "../managers/GameManager";

export const Dashboard = () => {

    const [games, setGames] = useState([]);

    const getGames = () => fetchGames.then(games => setGames(games));

    useEffect(() => {
        getGames();
        console.log(games);
    }, []);
    return (
        <>
            Dashboard content should include cards for up-coming events that the user is on the roster / wait-list for and up-coming sign-up events
        </>
    )
}
