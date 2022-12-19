import { LockClosedIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGame } from '../managers/GameManager';
import {
   deleteUserFromRoster,
   postUserToRoster,
} from '../managers/RosterManager';
import { fetchRoster, getCurrentUser } from '../managers/UserManager';
import { RegistrationModal } from '../modals/RegistrationModal';
import { RegLockModal } from '../modals/RegLockModal';
import { UnregisterModal } from '../modals/UnregisterModal';
import { RosterItem } from './RosterItem';

export const GameDetails = ({ isAdmin }) => {
   const { id } = useParams();

   const navigate = useNavigate();
   const navToDashboard = () => navigate('/');

   const [game, setGame] = useState({});
   const [roster, setRoster] = useState([]);
   const [isWaitList, setIsWaitList] = useState(false);
   const [canRegister, setCanRegister] = useState(false);
   const [canUnregister, setCanUnregister] = useState(false);
   const [registrationNotOpen, setRegistrationNotOpen] = useState(false);

   const [startingRoster, setStartingRoster] = useState([]);
   const [waitList, setWaitList] = useState([]);

   const [modalOpen, setModalOpen] = useState(false);
   const [unregisterModalOpen, setUnregisterModalOpen] = useState(false);
   const [regLockModalOpen, setRegLockModalOpen] = useState(false);

   const navToGameEdit = () => {
      navigate(`/edit-game/${id}`);
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

   const handleUnregister = () => {
      deleteUserFromRoster(game.id);
      setCanUnregister(false);
      setUnregisterModalOpen(false);
   };

   const handleModalNav = () => {
      navigate('/');
   };

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
         setRoster(rosterArr);
      }

      checkCanRegister(rosterArr, gameObj);
   };

   /**
    * Checks if current user is already registered and if registration date status is open (-1)
    */
   const checkCanRegister = (rosterArr, gameObj) => {
      const userId = getCurrentUser().id;
      const isAlreadyRegistered = rosterArr.some(
         (player) => player.id === userId
      );

      if (gameObj.signupDateStatus < 0 && !isAlreadyRegistered) {
         setCanRegister(true);
      } else if (gameObj.signupDateStatus < 0 || isAlreadyRegistered) {
         setCanUnregister(true);
      } else if (gameObj.signupDateStatus > 0) {
         setRegistrationNotOpen(true);
      }
   };

   useEffect(() => {
      fetchData();
   }, [modalOpen, unregisterModalOpen]);

   return (
      <>
         <div className="px-5 pt-6 last:pb-6">
            <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
               <div className="overflow-hidden bg-white shadow rounded-md">
                  <div className="flex justify-between px-4 py-5 sm:px-6">
                     <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                           {game.title}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                           {game.gameDateString}
                        </p>
                     </div>
                     {isAdmin && (
                        <button
                           title="Edit Game"
                           className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-2 pl-3 mb-2 text-sm font-medium text-black shadow-sm hover:bg-lime-300 focus:bg-lime-300"
                           onClick={navToGameEdit}
                        >
                           <PencilSquareIcon
                              className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                              aria-hidden="true"
                           />
                        </button>
                     )}
                  </div>
                  <div className="border-t border-gray-200">
                     <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">
                              Location
                           </dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {game.location}
                           </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">
                              Host
                           </dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {game.adminUser?.fullName}
                           </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">
                              Host contact
                           </dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              (555) 245-2509
                           </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">
                              About
                           </dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {game.description}
                           </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">
                              Player slots
                           </dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {isWaitList
                                 ? `${game.maxPlayers} / ${game.maxPlayers} + (${waitList.length} on waitlist)`
                                 : `${roster.length} / ${game.maxPlayers}`}
                           </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">
                              Detailed roster
                           </dt>
                           <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                 {isWaitList
                                    ? startingRoster.map((player, i) => (
                                         <RosterItem
                                            key={player.id}
                                            player={player}
                                            i={i}
                                            isWaitList={false}
                                         />
                                      ))
                                    : roster.map((player, i) => (
                                         <RosterItem
                                            key={player.id}
                                            player={player}
                                            i={i}
                                            isWaitList={false}
                                         />
                                      ))}
                              </ul>
                           </dd>
                        </div>
                        {isWaitList && (
                           <>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                 <dt className="text-sm font-medium text-gray-500">
                                    Wait-list
                                 </dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                       {waitList.map((player, i) => (
                                          <RosterItem
                                             key={player.id}
                                             player={player}
                                             i={i}
                                             isWaitList={true}
                                          />
                                       ))}
                                    </ul>
                                 </dd>
                              </div>
                           </>
                        )}
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                           <dt className="text-sm font-medium text-gray-500">
                              Actions
                           </dt>
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
                                             ? 'Register'
                                             : 'Join Waitlist'}
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
         <RegistrationModal
            open={modalOpen}
            setOpen={setModalOpen}
            handleNav={handleModalNav}
            onDetails={true}
         />
         <UnregisterModal
            open={unregisterModalOpen}
            setOpen={setUnregisterModalOpen}
            handleUnregister={handleUnregister}
            onDetails={true}
         />
         <RegLockModal
            open={regLockModalOpen}
            setOpen={setRegLockModalOpen}
            signUpTime={game.signupDateString}
         />
      </>
   );
};
