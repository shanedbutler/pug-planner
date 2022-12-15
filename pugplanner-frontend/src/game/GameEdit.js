import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGame, fetchPostGame } from "../managers/GameManager";
import { getCurrentUser } from "../managers/UserManager";

export const GameEdit = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [game, setGame] = useState({});

    const titleRef = useRef();
    const locationRef = useRef();
    const addressRef = useRef();
    const descriptionRef = useRef();
    const gameDateRef = useRef();
    const gameTimeRef = useRef();
    const signupDateRef = useRef();
    const signupTimeRef = useRef();
    const maxPlayersRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedGame = {
            id: id,
            title: titleRef.current.value,
            location: locationRef.current.value,
            address: addressRef.current.value,
            description: descriptionRef.current.value,
            gameDate: new Date(gameDateRef.current.value + "T" + gameTimeRef.current.value),
            signupDate: new Date(signupDateRef.current.value + "T" + signupTimeRef.current.value),
            maxPlayers: parseInt(maxPlayersRef.current.value),
            userProfileId: getCurrentUser().id
        };

        fetchPostGame(editedGame).then(() => navigate("/"));
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(`/game/${id}`);
    };

    useEffect(() => {
        fetchGame(id).then(game => setGame(game));
    }, []);

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl space-y-8">
                <div className="mt-10 sm:mt-0">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0 text-center">
                            <h3 className="text-3xl font-medium leading-6 text-gray-900">Edit Game</h3>
                            <p className="mt-3 text-sm text-gray-600">Edit game event information</p>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-6 mt-5">
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form onSubmit={handleSubmit}>
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    required
                                                    value={game.title}
                                                    ref={titleRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                    Location Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    id="location"
                                                    required
                                                    value={game.location}
                                                    ref={locationRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-6">
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                    Location Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    required
                                                    value={game.address}
                                                    ref={addressRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-6">
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                    Description
                                                </label>
                                                <textarea
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    required
                                                    value={game.description}
                                                    ref={descriptionRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="game-date" className="block text-sm font-medium text-gray-700">
                                                    Game Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="game-date"
                                                    name="game-date"
                                                    required
                                                    value={game.gameDateFormString}
                                                    ref={gameDateRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="game-time" className="block text-sm font-medium text-gray-700">
                                                    Game Time
                                                </label>
                                                <input
                                                    type="time"
                                                    id="game-time"
                                                    name="game-time"
                                                    value={game.gameTimeFormString}
                                                    required
                                                    ref={gameTimeRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="signup-date" className="block text-sm font-medium text-gray-700">
                                                    Signup Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="signup-date"
                                                    name="signup-date"
                                                    required
                                                    value={game.signupDateFormString}
                                                    ref={signupDateRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="signup-time" className="block text-sm font-medium text-gray-700">
                                                    Signup Time
                                                </label>
                                                <input
                                                    type="time"
                                                    id="signup-time"
                                                    name="signup-time"
                                                    required
                                                    value={game.signupTimeFormString    }
                                                    ref={signupTimeRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="max-players" className="block text-sm font-medium text-gray-700">
                                                    Max Players
                                                </label>
                                                <input
                                                    type="number"
                                                    id="max-players"
                                                    name="max-players"
                                                    required
                                                    placeholder={game.maxPlayers}
                                                    ref={maxPlayersRef}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 text-right py-3 px-3 sm:px-6">
                                        <button
                                            type="submit"
                                            className="rounded-md border border-transparent bg-lime-100 py-2 px-4 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-200 focus:bg-lime-200"
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="rounded-md border border-transparent bg-rose-100 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-rose-200 focus:bg-rose-200"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}