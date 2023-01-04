import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserRosterCount } from '../managers/RosterManager';
import { fetchUser, UserAvatar } from '../managers/UserManager';

export const PlayerProfile = ({ isAdmin }) => {
   const { id } = useParams();

   const [player, setPlayer] = useState({});
   const [appearances, setAppearances] = useState(0);

   useEffect(() => {
      fetchUser(id).then((userObj) => setPlayer(userObj));
      fetchUserRosterCount(id).then((countObj) => setAppearances(countObj.appearances));
   }, []);

   return (
      <div className="max-w-md mx-auto sm:max-w-xl bg-white mb-6 shadow rounded-md mt-16">
         <div className="px-4 py-6 sm:px-6">
            <div className="flex flex-wrap justify-center">
               <div className="w-full flex justify-center">
                  <div className="border-none -m-16">
                     <UserAvatar fullName={player.fullName} scale={128} />
                  </div>
               </div>
               <div className="w-full text-center mt-10">
                  <div className="flex justify-center pt-8">
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
                           {player.position?.primary} /{' '}
                           {player.position?.secondary}
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
                        <div className='mt-1'>{player.email}</div>
                        <div className="mt-1">Emergency contact: {player.emergencyName} at {player.emergencyPhone}</div>
                     </>
                  )}
               </div>
            </div>
            <div className="mt-5 py-6 border-t border-slate-200 text-center">
               <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4">
                     <p className="text-sm text-slate-700 mb-4">
                        A player of considerable range, Foo is the name taken by
                        the Melbourne-raised, LA-based goal keeper. Foo is
                        considered to excel at shear speed and determination.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
