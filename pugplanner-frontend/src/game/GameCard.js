import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUserToRoster } from "../managers/RosterManager";
import { RegistrationModal } from "../modals/RegistrationModal";

export const GameCard = ({ game }) => {

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false)

    const handleRegister = () => {
        postUserToRoster(game.id);
        setModalOpen(true);
    };

    const handleDetails = () => {
        navigate(`/game/${game.id}`);
    };

    return (
        <>
            <div className="px-5 pt-6 last:pb-6">
                <div className="mx-auto max-w-lg sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow rounded-md">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{game.title}</h3>
                            <p className="mt-1 max-w-lg text-sm text-gray-500">{game.gameDateString}</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 pt-4 pb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{game.location}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Host</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Victor Quintero</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Roster</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">5 out of {game.maxPlayers} players signed-up</dd>
                                </div>
                                <div className="bg-gray-50 px-4 pt-3 pb-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">About</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {game.description}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Actions</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ul role="list">
                                            <li className="flex items-center justify-end py-2 pl-2 pr-3 text-sm">
                                                <button
                                                    className="rounded-md border border-transparent bg-lime-100 py-2 px-4 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-200 focus:bg-lime-200"
                                                    onClick={handleDetails}
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    className="rounded-md border border-transparent bg-rose-100 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-rose-200 focus:bg-rose-200"
                                                    onClick={handleRegister}
                                                >
                                                    Register
                                                </button>
                                            </li>
                                        </ul>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <RegistrationModal open={modalOpen} setOpen={setModalOpen} handleDetails={handleDetails} />
        </>
    )
}