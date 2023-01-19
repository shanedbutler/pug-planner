import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { fetchGame, fetchPutGame } from '../managers/GameManager';
import { fetchUsers, getCurrentUser } from '../managers/UserManager';

export const GameEdit = () => {
   const { id } = useParams();

   const navigate = useNavigate();

   const [game, setGame] = useState({});

   // React-select state variables for secondary host selection from users array
   const [userOptions, setUserOptions] = useState([]);
   const [secondaryHostSelection, setSecondaryHostSelection] = useState();
   const [secondaryHostDefault, setSecondaryHostDefault] = useState();
   
   // UseRef hooks for all non-select inputs
   const titleRef = useRef();
   const locationRef = useRef();
   const addressRef = useRef();
   const descriptionRef = useRef();
   const gameDateRef = useRef();
   const gameTimeRef = useRef();
   const signupDateRef = useRef();
   const signupTimeRef = useRef();
   const maxPlayersRef = useRef();

   /**
    * Push array values to option array and set to state for use by react-select
    * Create null value object at beginning of array as 'none' option
    * @param {*} usersArr 
    */
   const handleSetUsers = (usersArr) => {
      let userOptionsArr = [{
         value: "",
         label: "None",
      }];
      usersArr.forEach((user) => {
         const userOptionObj =
         {
            value: user.id,
            label: user.fullName,
         };
         userOptionsArr.push(userOptionObj);
      });
      setUserOptions(userOptionsArr);
   };

   const handleUserSelect = (e) => setSecondaryHostSelection(e.value);

   /**
    * Find the game's currently chosen co-host and set to state in a react-select format object
    */
      const handleSetDefaults = (game, users) => {
         const gameSecondaryHost = users.find((user) => user.id === game.secondaryHostId);
         
         const gameSecondaryHostOption = {
            value: gameSecondaryHost.id,
            label: gameSecondaryHost.fullName,
         };

         setSecondaryHostDefault(gameSecondaryHostOption);
      };

   const handleSubmit = (e) => {
      e.preventDefault();

      const editedGame = {
         id: parseInt(id),
         title: titleRef.current.value,
         location: locationRef.current.value,
         address: addressRef.current.value,
         description: descriptionRef.current.value,
         gameDate: gameDateRef.current.value + 'T' + gameTimeRef.current.value,
         signupDate: signupDateRef.current.value + 'T' + signupTimeRef.current.value,
         maxPlayers: parseInt(maxPlayersRef.current.value),
         primaryHostId: getCurrentUser().id,
         secondaryHostId: parseInt(secondaryHostSelection),
      };

      fetchPutGame(editedGame).then(navigate(`/game/${id}`));
   };

   const handleCancel = (e) => {
      e.preventDefault();
      navigate(`/game/${id}`);
   };

   useEffect(() => {

      // Get data responses from api and set to variables
      const gameRes = fetchGame(id);
      const usersRes = fetchUsers();

      // Group values into promise all, and when their values are returned set state with setter functions
      Promise.all([gameRes, usersRes]).then((values) => {
         setGame(values[0]);
         handleSetUsers(values[1]);
         handleSetDefaults(values[0], values[1]);
      });

   }, []);

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
                           <div className="bg-white shadow sm:rounded-md px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                 <div className="col-span-6 sm:col-span-3">
                                    <label
                                       htmlFor="title"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Title
                                    </label>
                                    <input
                                       type="text"
                                       name="title"
                                       id="title"
                                       required
                                       defaultValue={game.title}
                                       ref={titleRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-3">
                                    <label
                                       htmlFor="location"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Location Name
                                    </label>
                                    <input
                                       type="text"
                                       name="location"
                                       id="location"
                                       required
                                       defaultValue={game.location}
                                       ref={locationRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-6">
                                    <label
                                       htmlFor="address"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Location Address
                                    </label>
                                    <input
                                       type="text"
                                       name="address"
                                       id="address"
                                       required
                                       defaultValue={game.address}
                                       ref={addressRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-6">
                                    <label
                                       htmlFor="description"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Description
                                    </label>
                                    <textarea
                                       rows="4" 
                                       type="text"
                                       id="description"
                                       name="description"
                                       required
                                       defaultValue={game.description}
                                       ref={descriptionRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-3">
                                    <label
                                       htmlFor="max-players"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Max Players
                                    </label>
                                    <input
                                       type="number"
                                       id="max-players"
                                       name="max-players"
                                       required
                                       defaultValue={game.maxPlayers}
                                       ref={maxPlayersRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-3">
                                    <label
                                       htmlFor="secondaryHost"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Co-Host
                                    </label>
                                    <Select
                                       id="secondary-host"
                                       name="secondary-host"
                                       options={userOptions}
                                       value={secondaryHostDefault}
                                       isSearchable={false}
                                       onChange={handleUserSelect}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-3">
                                    <label
                                       htmlFor="game-date"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Game Date
                                    </label>
                                    <input
                                       type="date"
                                       id="game-date"
                                       name="game-date"
                                       required
                                       defaultValue={game.gameDateFormString}
                                       ref={gameDateRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-3">
                                    <label
                                       htmlFor="game-time"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Game Time
                                    </label>
                                    <input
                                       type="time"
                                       id="game-time"
                                       name="game-time"
                                       defaultValue={game.gameTimeFormString}
                                       required
                                       ref={gameTimeRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-3">
                                    <label
                                       htmlFor="signup-date"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Sign-up Date
                                    </label>
                                    <input
                                       type="date"
                                       id="signup-date"
                                       name="signup-date"
                                       required
                                       defaultValue={game.signupDateFormString}
                                       ref={signupDateRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                                 <div className="col-span-6 sm:col-span-3">
                                    <label
                                       htmlFor="signup-time"
                                       className="block text-sm font-medium text-gray-700"
                                    >
                                       Sign-up Time
                                    </label>
                                    <input
                                       type="time"
                                       id="signup-time"
                                       name="signup-time"
                                       required
                                       defaultValue={game.signupTimeFormString}
                                       ref={signupTimeRef}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                    />
                                 </div>

                              </div>
                           </div>
                           <div className="bg-gray-50 shadow rounded-md text-right -mt-2 py-6 px-3 sm:px-6">
                              <button
                                 className="rounded-md border border-transparent bg-rose-100 py-2 px-4 mr-3 text-sm font-medium text-black shadow-sm hover:bg-rose-200 focus:bg-rose-200"
                                 onClick={handleCancel}
                              >
                                 Cancel
                              </button>
                              <button
                                 type="submit"
                                 className="rounded-md border border-transparent bg-lime-100 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-lime-200 focus:bg-lime-200"
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
