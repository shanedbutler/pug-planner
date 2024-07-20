import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../managers/UserManager';

export const RosterItem = ({ player, i, isWaitList }) => {
   const navigate = useNavigate();

   const handleProfileNav = () => {
      navigate(`/profile/${player.id}`);
   };

   if (!isWaitList) {
      return (
         <div className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
            <li className="flex items-center justify-between sm:mx-8 py-3 px-4 text-sm">
               <div className="cursor-pointer flex items-center" onClick={handleProfileNav}>
                  <UserAvatar fullName={player.fullName} className=" h-5 w-5 flex-shrink-0" aria-hidden="true" />
               </div>
               <div className="cursor-pointer text-slate-600 hover:text-violet-500" onClick={handleProfileNav}>
                  {player.fullName}
               </div>
               <div className="ml-4">
                  <span className="w-0">
                     {player.primaryPosition?.name} / {player.secondaryPosition?.name}
                  </span>
               </div>
            </li>
         </div>
      );
   } else {
      return (
         <div className={i % 2 ? 'bg-rose-100' : 'bg-rose-50'}>
            <li className="flex items-center justify-between sm:mx-8 py-3 px-5 text-sm">
               <div className="cursor-pointer flex items-center" onClick={handleProfileNav}>
                  <UserAvatar fullName={player.fullName} className=" h-5 w-5 flex-shrink-0" aria-hidden="true" />
               </div>
               <div className="cursor-pointer text-slate-600 hover:text-violet-500" onClick={handleProfileNav}>
                  {player.fullName}
               </div>
               <div className="ml-4">
                  <span className="w-0">
                     {player.primaryPosition?.name} / {player.secondaryPosition?.name}
                  </span>
               </div>
            </li>
         </div>
      );
   }
};
