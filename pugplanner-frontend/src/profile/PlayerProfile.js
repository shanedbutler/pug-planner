import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser, UserAvatar } from '../managers/UserManager';

export const PlayerProfile = () => {
   const { id } = useParams();

   const [player, setPlayer] = useState({});

   useEffect(() => {
      fetchUser(id).then((userObj) => setPlayer(userObj));
   }, []);

   return (
      <div class="relative max-w-md mx-auto sm:max-w-xl py-6 bg-white mb-6 shadow rounded-md mt-16">
         <div class="px-5">
            <div class="flex flex-wrap justify-center">
               <div class="w-full flex justify-center">
                  <div class="border-none -m-16 lg:-ml-16">
                     <UserAvatar fullName={player.fullName} scale={128} />
                  </div>
               </div>
               <div class="w-full text-center mt-10">
                  <div class="flex justify-center pt-8 pb-0">
                     <div class="p-3 text-center">
                        <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">
                           {player.id}
                        </span>
                        <span class="text-sm text-slate-400">Appearances</span>
                     </div>
                     <div class="p-3 text-center">
                        <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">
                           {player.position?.primary} /{' '}
                           {player.position?.secondary}
                        </span>
                        <span class="text-sm text-slate-400">Positions</span>
                     </div>
                     <div class="p-3 text-center">
                        <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">
                           {player.joinYear}
                        </span>
                        <span class="text-sm text-slate-400">Member Since</span>
                     </div>
                  </div>
               </div>
            </div>
            <div class="text-center mt-2">
               <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
                  {player.fullName}
               </h3>
               <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                  LA Galaxy
               </div>
            </div>
            <div class="mt-6 py-6 border-t border-slate-200 text-center">
               <div class="flex flex-wrap justify-center">
                  <div class="w-full px-4">
                     <p class="font-light leading-relaxed text-slate-700 mb-4">
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
