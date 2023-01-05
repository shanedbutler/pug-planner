import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserRosterCount } from '../managers/RosterManager';
import { fetchUser, getCurrentUser, UserAvatar } from '../managers/UserManager';

export const PlayerProfile = ({ isAdmin }) => {
   const { id } = useParams();

   const navigate = useNavigate();

   const [player, setPlayer] = useState({});
   const [appearances, setAppearances] = useState(0);
   const [isOwn, setIsOwn] = useState(false);

   const navToProfileEdit = () => {
      navigate('/profile/edit');
   };

   /**
    * Use local storage object to check if current user is at their own profile page
    */
   const checkAndSet = (userObj) => {
      const userId = getCurrentUser().id;
      if (userId === userObj.id) {
         setIsOwn(true);
      }
      setPlayer(userObj);
   };

   useEffect(() => {
      fetchUser(id).then((userObj) => checkAndSet(userObj));
      fetchUserRosterCount(id).then((countObj) =>
         setAppearances(countObj.appearances)
      );
   }, []);

   return (
      <div className="px-5 py-5 max-w-md mx-auto sm:max-w-lg">
         {isOwn && (
            <div className="flex -mb-12 pb-1">
               <button
                  className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-4 pl-3 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-300 focus:bg-lime-300"
                  onClick={navToProfileEdit}
               >
                  <PencilSquareIcon
                     className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                     aria-hidden="true"
                  />
                  Edit
               </button>
            </div>
         )}
         <div className="max-w-md mx-auto sm:max-w-lg bg-white mb-6 mt-16 shadow rounded-md">
            <div className="px-4 py-6 sm:px-6">
               <div className="flex flex-wrap justify-center">
                  <div className="w-full flex justify-center">
                     <div className="border-none -m-16">
                        <UserAvatar fullName={player.fullName} scale={110} />
                     </div>
                  </div>
                  <div className="w-full text-center mt-10">
                     <div className="flex justify-center pt-2">
                        <div className="w-35 p-3 text-center">
                           <span className="block uppercase tracking-wide text-slate-700">
                              {appearances}
                           </span>
                           <span className="text-sm text-slate-400">
                              Appearances
                           </span>
                        </div>
                        <div className="w-35 p-3 text-center">
                           <span className="block uppercase tracking-wide text-slate-700">
                              {player.position?.primary} / {player.position?.secondary}
                           </span>
                           <span className="text-sm text-slate-400">
                              Positions
                           </span>
                        </div>
                        <div className="w-35 p-3 text-center">
                           <span className="block uppercase tracking-wide text-slate-700">
                              {player.joinYear}
                           </span>
                           <span className="text-sm text-slate-400">
                              Member Since
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="text-center mt-1">
                  <h3 className="text-xl text-slate-700 font-medium leading-normal">
                     {player.fullName}
                  </h3>
                  <div className="text-sm mt-0 mb-2 text-slate-400">
                     ({player.pronoun?.name})
                     <div className="mt-1">{player.club}</div>
                     {isAdmin && (
                        <>
                           <div className="mt-1">{player.phone}</div>
                           <div className="mt-1">{player.email}</div>
                           <div className="mt-1">
                              Emergency contact: {player.emergencyName} at {player.emergencyPhone}
                           </div>
                        </>
                     )}
                  </div>
               </div>
               <div className="mt-5 pt-6 border-t border-slate-200 text-center">
                  <div className="flex flex-wrap justify-center">
                     <div className="w-full px-4">
                        <p className="text-sm text-slate-700 mb-4">
                           A player of considerable range, Foo is the name taken
                           by the Melbourne-raised, LA-based goal keeper. Foo is
                           considered to excel at shear speed and determination.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
