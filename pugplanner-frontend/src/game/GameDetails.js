import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGame } from '../managers/GameManager';
import { fetchRoster } from '../managers/UserManager';
import { RosterItem } from './RosterItem';

export const GameDetails = () => {

    const { id } = useParams();
    const [game, setGame] = useState({});
    const [roster, setRoster] = useState([]);

    // TODO: Attach admin user to game object

    useEffect(() => {
        fetchGame(id).then(game => setGame(game));
        fetchRoster(id).then(roster => setRoster(roster));
    }, [id]);

    return (
        <div className="px-5 pt-6 last:pb-6">
            <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{game.title}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{game.gameDateString}</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Location</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{game.location}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Host</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{game.adminUser?.fullName}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Host contact</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">(555) 245-2509</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">About</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{game.description}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Player slots</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{roster.length} / {game.maxPlayers}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Detailed roster</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                        {roster.map((player, i) => <RosterItem key={player.id} player={player} i={i} />)}
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
