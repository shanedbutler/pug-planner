import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameCard } from "../game/GameCard";
import { fetchGames } from "../managers/GameManager";

export const Dashboard = ({ isAdmin }) => {

    const [games, setGames] = useState([]);

    const navigate = useNavigate();

    const navToGameForm = () => navigate("/new-game")

    const filterGames = (gamesArr) => {
        const currentGames = gamesArr.filter(game => game.gameDateStatus > -1);
        setGames(currentGames);
    };

    useEffect(() => {
        fetchGames().then(games => filterGames(games));
    }, []);

    return (
        <div className="px-2 last:pb-6">
            <div className="px-5 py-5 mx-auto max-w-lg">
                {isAdmin &&
                    <button
                        className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-4 pl-3 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-300 focus:bg-lime-300"
                        onClick={navToGameForm}
                    >
                        <PlusCircleIcon className="h-5 w-5 mr-1 flex-shrink text-slate-600" aria-hidden="true" />
                        New Game
                    </button>
                }
                {games.map(game => <GameCard key={game.id} game={game} />)}
            </div>
        </div>
    )
}
