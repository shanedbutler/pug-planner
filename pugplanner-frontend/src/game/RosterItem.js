import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../managers/UserManager';

export const RosterItem = ({ player, i, isWaitList }) => {
   const navigate = useNavigate();

   const handleProfileNav = () => {
      navigate(`/profile/${player.id}`);
   };

   if (!isWaitList) {
      return (
         <li className={`${i % 2 ? 'bg-gray-50' : 'bg-white'} flex items-center justify-around py-3 px-4 text-sm`}>
            <div className="cursor-pointer flex items-center" onClick={handleProfileNav}>
               <UserAvatar fullName={player.fullName} className=" h-5 w-5 flex-shrink-0" aria-hidden="true" />
            </div>
            <div className="cursor-pointer text-slate-600 hover:text-violet-500" onClick={handleProfileNav}>
               {player.fullName}
            </div>
            <div className="ml-4">
               <span className="w-0">
                  {player.position?.primary} / {player.position?.secondary}
               </span>
            </div>
         </li>
      );
   } else {
      return (
         <div className={i % 2 ? 'bg-rose-100' : 'bg-rose-50'}>
            <li className="flex items-center justify-between sm:mx-12 py-3 px-5 text-sm">
               <div className="cursor-pointer flex items-center" onClick={handleProfileNav}>
                  <UserAvatar fullName={player.fullName} className=" h-5 w-5 flex-shrink-0" aria-hidden="true" />
               </div>
               <div className="cursor-pointer text-slate-600 hover:text-violet-500" onClick={handleProfileNav}>
                  {player.fullName}
               </div>
               <div className="ml-4">
                  <span className="w-0">
                     {player.position?.primary} / {player.position?.secondary}
                  </span>
               </div>
            </li>
         </div>
      );
   }
};
