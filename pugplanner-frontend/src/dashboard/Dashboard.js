import { useEffect, useState } from "react";
import { GameCard } from "../game/GameCard";
import { fetchGames } from "../managers/GameManager";

export const Dashboard = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames().then(games => setGames(games));
    }, []);

    return (
        <>
        {games.map(game => <GameCard key={game.id} game={ game } />)}
        </>
    )
}
