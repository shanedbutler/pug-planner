import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { fetchPutGame } from '../managers/GameManager';
import { getLocalUser } from '../managers/UserManager';

export const GameEdit = () => {
   const { game, profiles } = useLoaderData();
   const { id } = useParams();
   const navigate = useNavigate();

   // State Declarations
   const [userOptions, setUserOptions] = useState([]);
   const [secondaryHostSelection, setSecondaryHostSelection] = useState("");
   const [secondaryHostDefault, setSecondaryHostDefault] = useState({ value: "", label: "None" });

   // Refs for all non-select inputs
   const titleRef = useRef();
   const locationRef = useRef();
   const addressRef = useRef();
   const descriptionRef = useRef();
   const gameDateRef = useRef();
   const gameTimeRef = useRef();
   const signupDateRef = useRef();
   const signupTimeRef = useRef();
   const maxPlayersRef = useRef();

   // Initialize State Variables
   useEffect(() => {
      // Initialize userOptions with "None" and profiles
      const initialUserOptions = [
         { value: "", label: "None" },
         ...profiles.map(user => ({ value: user.id, label: user.fullName }))
      ];
      setUserOptions(initialUserOptions);

      // Initialize secondaryHostSelection
      setSecondaryHostSelection(game.secondaryHostId || "");

      // Initialize secondaryHostDefault based on game.secondaryHostId
      const host = profiles.find(user => user.id === game.secondaryHostId);
      if (host) {
         setSecondaryHostDefault({ value: host.id, label: host.fullName });
      } else {
         setSecondaryHostDefault({ value: "", label: "None" });
      }
   }, [game, profiles]);

   // Handle selection change for Co-Host
   const handleUserSelect = (selectedOption) => {
      setSecondaryHostSelection(selectedOption ? selectedOption.value : "");
   };

   // Handle form submission
   const handleSubmit = (e) => {
      e.preventDefault();

      const editedGame = {
         id: parseInt(id),
         title: titleRef.current.value,
         location: locationRef.current.value,
         address: addressRef.current.value,
         description: descriptionRef.current.value,
         gameDate: `${gameDateRef.current.value}T${gameTimeRef.current.value}`,
         signupDate: `${signupDateRef.current.value}T${signupTimeRef.current.value}`,
         maxPlayers: parseInt(maxPlayersRef.current.value),
         primaryHostId: getLocalUser().id,
         secondaryHostId: secondaryHostSelection ? parseInt(secondaryHostSelection) : null,
      };

      fetchPutGame(editedGame).then(() => navigate(`/game/${id}`));
   };

   // Handle cancel action
   const handleCancel = (e) => {
      e.preventDefault();
      navigate(`/game/${id}`);
   };

   return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
         <div className="w-full max-w-xl space-y-8">
            <div className="mt-10 sm:mt-0">
               <div className="md:col-span-1">
                  <div className="px-4 sm:px-0 text-center">
                     <h3 className="text-3xl font-medium leading-6 text-gray-900">
                        Edit Game
                     </h3>
                     <p className="mt-3 text-sm text-gray-600">
                        Edit game event information
                     </p>
                  </div>
               </div>
               <div className="md:grid md:grid-cols-2 md:gap-6 mt-5">
                  <div className="mt-5 md:col-span-2 md:mt-0">
                     <form onSubmit={handleSubmit}>
                        <div>
                           <div className="bg-white shadow-sm sm:rounded-md px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                 {/* Title */}
                                 <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                       Title
                                    </label>
                                    <input
                                       type="text"
                                       name="title"
                                       id="title"
                                       required
                                       defaultValue={game.title}
                                       ref={titleRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Location Name */}
                                 <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                       Location Name
                                    </label>
                                    <input
                                       type="text"
                                       name="location"
                                       id="location"
                                       required
                                       defaultValue={game.location}
                                       ref={locationRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Address */}
                                 <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                       Location Address
                                    </label>
                                    <input
                                       type="text"
                                       name="address"
                                       id="address"
                                       required
                                       defaultValue={game.address}
                                       ref={addressRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Description */}
                                 <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                       Description
                                    </label>
                                    <textarea
                                       rows="4"
                                       id="description"
                                       name="description"
                                       required
                                       defaultValue={game.description}
                                       ref={descriptionRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Max Players */}
                                 <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="max-players" className="block text-sm font-medium text-gray-700">
                                       Max Players
                                    </label>
                                    <input
                                       type="number"
                                       id="max-players"
                                       name="max-players"
                                       required
                                       defaultValue={game.maxPlayers}
                                       ref={maxPlayersRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Co-Host */}
                                 <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="secondaryHost" className="block text-sm font-medium text-gray-700">
                                       Co-Host
                                    </label>
                                    <Select
                                       id="secondary-host"
                                       name="secondary-host"
                                       options={userOptions}
                                       value={secondaryHostDefault}
                                       isClearable
                                       onChange={handleUserSelect}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Game Date */}
                                 <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="game-date" className="block text-sm font-medium text-gray-700">
                                       Game Date
                                    </label>
                                    <input
                                       type="date"
                                       id="game-date"
                                       name="game-date"
                                       required
                                       defaultValue={new Date(game.gameDate).toISOString().split('T')[0]}
                                       ref={gameDateRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Game Time */}
                                 <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="game-time" className="block text-sm font-medium text-gray-700">
                                       Game Time
                                    </label>
                                    <input
                                       type="time"
                                       id="game-time"
                                       name="game-time"
                                       defaultValue={new Date(game.gameDate).toTimeString().slice(0,5)}
                                       required
                                       ref={gameTimeRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Sign-up Date */}
                                 <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="signup-date" className="block text-sm font-medium text-gray-700">
                                       Sign-up Date
                                    </label>
                                    <input
                                       type="date"
                                       id="signup-date"
                                       name="signup-date"
                                       required
                                       defaultValue={new Date(game.signupDate).toISOString().split('T')[0]}
                                       ref={signupDateRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                                 {/* Sign-up Time */}
                                 <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="signup-time" className="block text-sm font-medium text-gray-700">
                                       Sign-up Time
                                    </label>
                                    <input
                                       type="time"
                                       id="signup-time"
                                       name="signup-time"
                                       required
                                       defaultValue={new Date(game.signupDate).toTimeString().slice(0,5)}
                                       ref={signupTimeRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>
                              </div>
                           </div>
                           {/* Action Buttons */}
                           <div className="bg-gray-50 shadow-sm rounded-md text-right -mt-2 py-6 px-3 sm:px-6">
                              <button
                                 type="button"
                                 className="rounded-md border border-transparent bg-rose-100 py-2 px-4 mr-3 text-sm font-medium text-black shadow-xs hover:bg-rose-200 focus:bg-rose-200"
                                 onClick={handleCancel}
                              >
                                 Cancel
                              </button>
                              <button
                                 type="submit"
                                 className="rounded-md border border-transparent bg-lime-100 py-2 px-4 text-sm font-medium text-black shadow-xs hover:bg-lime-200 focus:bg-lime-200"
                              >
                                 Save
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};