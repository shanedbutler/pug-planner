import { LockClosedIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchDeleteGame, fetchGame } from '../managers/GameManager';
import { deleteUserFromRoster, postUserToRoster } from '../managers/RosterManager';
import { fetchRoster, getCurrentUser } from '../managers/UserManager';
import { RegistrationModal } from '../modals/RegistrationModal';
import { RegLockModal } from '../modals/RegLockModal';
import { UnregisterModal } from '../modals/UnregisterModal';
import { RosterItem } from './RosterItem';

export const GameDetails = ({ isAdmin }) => {
   const { id } = useParams();

   const navigate = useNavigate();

   const [game, setGame] = useState({});
   const [isRosterEmpty, setIsRosterEmpty] = useState(true);
   const [roster, setRoster] = useState([]);
   const [isWaitList, setIsWaitList] = useState(false);
   const [willWaitList, setWillWaitList] = useState(false);
   const [canRegister, setCanRegister] = useState(false);
   const [canUnregister, setCanUnregister] = useState(false);
   const [registrationNotOpen, setRegistrationNotOpen] = useState(false);
   const [canDelete, setCanDelete] = useState(false);

   const [startingRoster, setStartingRoster] = useState([]);
   const [waitList, setWaitList] = useState([]);

   const [modalOpen, setModalOpen] = useState(false);
   const [unregisterModalOpen, setUnregisterModalOpen] = useState(false);
   const [regLockModalOpen, setRegLockModalOpen] = useState(false);

   const navToGameEdit = () => navigate(`/edit-game/${id}`);
   const navToDashboard = () => navigate('/');

   const handleDelete = () => {
      fetchDeleteGame(id).then(navToDashboard);
   };

   const handleRegister = () => {
      postUserToRoster(game.id);
      setCanRegister(false);
      setCanUnregister(true);
      setModalOpen(true);
   };

   const handleUnregisterClick = () => {
      setUnregisterModalOpen(true);
   };

   const handleRegLockClick = () => {
      setRegLockModalOpen(true);
   };

   /**
    * Handles un-registering current user from roster by deleting them from roster
    * Additionally checks if there's only one wait-list player remaining and removes wait-list if so
    */
   const handleUnregister = () => {
      if (waitList.length === 1) {
         setIsWaitList(false);
      }
      deleteUserFromRoster(game.id);
      setCanUnregister(false);
      setUnregisterModalOpen(false);
   };

   /**
    * Fetches data and then sets state through checker function call.
    */
   const fetchData = () => {
      fetchGame(id).then((gameResponse) => {
         return fetchRoster(id).then((rosterResponse) => {
            checkDataToState(gameResponse, rosterResponse);
         });
      });
   };

   /**
    * Sets state with checking done against data.
    * Checks if current roster count is over game's max-players.
    * If so, splits roster array into "starting roster" and wait-list arrays and sets them to state.
    */
   const checkDataToState = (gameObj, rosterArr) => {
      setGame(gameObj);
      checkRosterLength(rosterArr);

      if (rosterArr.length > gameObj.maxPlayers) {
         const startingRosterArray = [];
         for (let i = 0; i < gameObj.maxPlayers; i++) {
            startingRosterArray.push(rosterArr[i]);
         }

         const waitListArray = [];
         for (let i = gameObj.maxPlayers; i < rosterArr.length; i++) {
            waitListArray.push(rosterArr[i]);
         }

         setStartingRoster(startingRosterArray);
         setWaitList(waitListArray);

         setIsWaitList(true);
      } else {
         // Set state if the next user to register will be added to the wait-list
         if (rosterArr.length === gameObj.maxPlayers) {
            setWillWaitList(true);
         }

         setRoster(rosterArr);
      }

      checkCanRegister(rosterArr, gameObj);
   };

   /**
    * Checks if current user is already registered.
    * Checks if game date status is not yet passed (1) and registration date status is open / past (-1).
    * Sets user registration ability state.
    * * @param {array} rosterArr
    * * @param {object} gameObj
    */
   const checkCanRegister = (rosterArr, gameObj) => {
      const userId = getCurrentUser().id;
      const isAlreadyRegistered = rosterArr.some((player) => player.id === userId);

      if (gameObj.gameDateStatus > 0) {
         if (gameObj.signupDateStatus < 0 && !isAlreadyRegistered) {
            setCanRegister(true);
         } else if (gameObj.signupDateStatus < 0 && isAlreadyRegistered) {
            setCanUnregister(true);
         } else if (gameObj.signupDateStatus > 0) {
            setRegistrationNotOpen(true);
         }
      }
   };

   /**
    * Checks if roster array is empty.
    * If array is empty checks if current user has privilege to delete the game.
    * Games with players registered to it's roster currently cannot be deleted.
    * @param {array} rosterArr
    */
   const checkRosterLength = (rosterArr) => {
      if (rosterArr.length === 0) {
         setIsRosterEmpty(true);

         if (isAdmin) {
            setCanDelete(true);
         }
      } else {
         setIsRosterEmpty(false);
         setCanDelete(false);
      }
   };

   useEffect(() => {
      fetchData();
   }, [modalOpen, unregisterModalOpen]);

   return (
      <>
         <div className="px-5 pt-10 last:pb-6">
            <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
               <div className="overflow-hidden bg-white shadow rounded-md">
                  <div className="flex justify-between px-4 py-5 sm:px-6">
                     <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{game.title}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                           {game.gameDateString}
                           <br />
                           {game.gameTimeString}
                        </p>
                     </div>
                     <div className="flex justify-end">
                        {isAdmin && (
                           <button
                              title="Edit Game"
                              className="flex h-10 rounded-md border border-transparent bg-lime-200 py-2 pr-2 pl-3 mb-2 mr-2 text-sm font-medium text-black shadow-sm hover:bg-lime-300 focus:bg-lime-300"
                              onClick={navToGameEdit}
                           >
                              <PencilSquareIcon
                                 className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                                 aria-hidden="true"
                              />
                           </button>
                        )}
                        {canDelete && (
                           <button
                              title="Delete Game"
                              className="flex h-10 rounded-md border border-transparent bg-red-200 py-2 pr-2 pl-3 mb-2 text-sm font-medium text-black shadow-sm hover:bg-red-300 focus:bg-red-300"
                              onClick={handleDelete}
                           >
                              <TrashIcon className="h-5 w-5 mr-1 flex-shrink text-slate-600" aria-hidden="true" />
                           </button>
                        )}
                     </div>
                  </div>
                  <div className="border-t border-gray-200">
                     {game.signupDateStatus > 0 && (
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">Sign-ups open</dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {game.signupDateString} at {game.signupTimeString}
                           </dd>
                        </div>
                     )}
                     <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">Location</dt>
                           <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                              <a href={`https://maps.google.com/?q=${game.address}`} target="_blank">
                                 {game.location}
                              </a>
                           </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">Hosted by</dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <Link to={`/profile/${game.primaryHost?.id}`}>{game.primaryHost?.fullName}</Link>
                              {game.secondaryHost && (
                                 <div>
                                    <Link to={`/profile/${game.secondaryHost?.id}`}>
                                       {game.secondaryHost?.fullName}
                                    </Link>
                                 </div>
                              )}
                           </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">Contact</dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {game.primaryHost?.nameAndPhone}
                              <br />
                              {game.secondaryHost?.nameAndPhone}
                           </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">Player slots</dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {isRosterEmpty
                                 ? game.maxPlayers
                                 : isWaitList
                                 ? `${game.maxPlayers} / ${game.maxPlayers} with ${waitList.length} on wait-list`
                                 : `${roster.length} / ${game.maxPlayers}`}
                           </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">Description</dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{game.description}</dd>
                        </div>
                        {!isRosterEmpty && (
                           <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Roster</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                 <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                    {isWaitList
                                       ? startingRoster.map((player, i) => (
                                            <RosterItem key={player.id} player={player} i={i} isWaitList={false} />
                                         ))
                                       : roster.map((player, i) => (
                                            <RosterItem key={player.id} player={player} i={i} isWaitList={false} />
                                         ))}
                                 </ul>
                              </dd>
                           </div>
                        )}
                        {isWaitList && (
                           <>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                 <dt className="text-sm font-medium text-gray-500">Wait-list</dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                       {waitList.map((player, i) => (
                                          <RosterItem key={player.id} player={player} i={i} isWaitList={true} />
                                       ))}
                                    </ul>
                                 </dd>
                              </div>
                           </>
                        )}
                        <div
                           className={`${
                              isRosterEmpty ? 'bg-white' : 'bg-gray-50'
                           } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                        >
                           <dt className="invisible text-sm font-medium text-gray-500">Actions</dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <ul>
                                 <li className="flex items-center justify-end py-2 pl-2 pr-3 text-sm">
                                    <button
                                       className="rounded-md border border-transparent bg-lime-100 py-2 px-4 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-200 focus:bg-lime-200"
                                       onClick={navToDashboard}
                                    >
                                       Back to dashboard
                                    </button>
                                    {canRegister && (
                                       <button
                                          className="rounded-md border border-transparent bg-rose-100 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-rose-200 focus:bg-rose-200"
                                          onClick={handleRegister}
                                       >
                                          {!isWaitList
                                             ? willWaitList
                                                ? 'Join Waitlist'
                                                : 'Register'
                                             : 'Join Wait-list'}
                                       </button>
                                    )}
                                    {canUnregister && (
                                       <button
                                          className="rounded-md border border-transparent bg-rose-100 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-rose-200 focus:bg-rose-200"
                                          onClick={handleUnregisterClick}
                                       >
                                          Unregister
                                       </button>
                                    )}
                                    {registrationNotOpen && (
                                       <button
                                          className="disabled flex rounded-md border border-transparent bg-rose-100 py-2 px-4 text-sm font-medium text-slate-600 shadow-sm"
                                          onClick={handleRegLockClick}
                                       >
                                          <LockClosedIcon
                                             className="h-5 w-4 mr-1 flex-shrink text-slate-600"
                                             aria-hidden="true"
                                          />
                                          <div>Registration</div>
                                       </button>
                                    )}
                                 </li>
                              </ul>
                           </dd>
                        </div>
                     </dl>
                  </div>
               </div>
            </div>
         </div>
         <RegistrationModal open={modalOpen} setOpen={setModalOpen} handleNav={navToDashboard} onDetails={true} />
         <UnregisterModal
            open={unregisterModalOpen}
            setOpen={setUnregisterModalOpen}
            handleUnregister={handleUnregister}
            onDetails={true}
         />
         <RegLockModal open={regLockModalOpen} setOpen={setRegLockModalOpen} signUpTime={game.signupDateString} />
      </>
   );
};
