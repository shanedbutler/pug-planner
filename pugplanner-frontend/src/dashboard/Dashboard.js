import { FunnelIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameCard } from '../game/GameCard';
import { fetchGames } from '../managers/GameManager';

export const Dashboard = ({ isAdmin }) => {
    const [allGames, setAllGames] = useState([]);
    const [games, setGames] = useState([]);
    const [isPast, setIsPast] = useState(false);

    const navigate = useNavigate();

    const navToGameForm = () => navigate('/new-game');

    /**
     * Filter games based on if their game date has past or not
     */
    const filterGames = () => {
        let filteredGames = [];

        if (!isPast) {
            filteredGames = allGames.filter((game) => game.gameDateStatus > -1);
            setGames(filteredGames);
        } else {
            filteredGames = allGames.filter((game) => game.gameDateStatus < 0);
            setGames(filteredGames);
        }
    };

    const toggleDateFilter = () => setIsPast(!isPast);

    useEffect(() => {
        filterGames(games);
    }, [isPast, allGames]);

    useEffect(() => {
        fetchGames().then((games) => setAllGames(games));
    }, []);

    return (
        <div className="px-2 last:pb-6">
            <div className="px-5 py-5 mx-auto max-w-lg">
                <div className="flex">
                    <button
                        className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-4 pl-3 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-300 focus:bg-lime-300"
                        onClick={toggleDateFilter}
                    >
                        <FunnelIcon
                            className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                            aria-hidden="true"
                        />
                        {isPast ? 'Show Current' : 'Show Past'}
                    </button>
                    {isAdmin && (
                        <button
                            className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-4 pl-3 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-300 focus:bg-lime-300"
                            onClick={navToGameForm}
                        >
                            <PlusCircleIcon
                                className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                                aria-hidden="true"
                            />
                            New Game
                        </button>
                    )}
                </div>
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};
