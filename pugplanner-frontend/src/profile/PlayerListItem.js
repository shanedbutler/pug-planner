import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editUserFetch, UserAvatar } from '../managers/UserManager';
import { PlayerActivationModal } from '../modals/PlayerActivationModal';
import { PlayerDeactivationModal } from '../modals/PlayerDeactivationModal';

export const PlayerListItem = ({ player, i }) => {
   const navigate = useNavigate();

   const [isActive, setIsActive] = useState(true);
   const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
   const [activateModalOpen, setActivateModalOpen] = useState(false);

   const handleProfileNav = () => {
      navigate(`/profile/${player.id}`);
   };

   const openDeactivateModal = () => {
      setDeactivateModalOpen(true);
   };

   const openActivateModal = () => {
      setActivateModalOpen(true);
   };

   const handleDeactivate = () => {
      const deactivatedPlayer = {
         id: player.id,
         firstName: player.firstName,
         lastName: player.lastName,
         email: player.email,
         phone: player.phone,
         club: player.club,
         createDateTime: player.createDateTime,
         primaryPositionId: player.primaryPositionId,
         secondaryPositionId: player.secondaryPositionId,
         admin: player.admin,
         pronounId: player.pronounId,
         emergencyName: player.emergencyName,
         emergencyPhone: player.emergencyPhone,
         active: false
      };
      editUserFetch(deactivatedPlayer);
      setIsActive(false);
      setDeactivateModalOpen(false);
   };

   const handleActivate = () => {
      const activatedPlayer = {
         id: player.id,
         firstName: player.firstName,
         lastName: player.lastName,
         email: player.email,
         phone: player.phone,
         club: player.club,
         createDateTime: player.createDateTime,
         primaryPositionId: player.primaryPositionId,
         secondaryPositionId: player.secondaryPositionId,
         admin: player.admin,
         pronounId: player.pronounId,
         emergencyName: player.emergencyName,
         emergencyPhone: player.emergencyPhone,
         active: true
      };
      editUserFetch(activatedPlayer);
      setIsActive(true);
      setActivateModalOpen(false);
   };

   useEffect(() => {
      if (player.active) {
         setIsActive(true);
      } else {
         setIsActive(false);
      }
   }, []);

   return (
      <>
         <li
            className={`${
               i % 2 ? 'bg-gray-50' : 'bg-white'
            } flex items-center justify-around py-3 px-4 text-sm`}
         >
            <div
               className="cursor-pointer flex items-center"
               onClick={handleProfileNav}
            >
               <UserAvatar
                  fullName={player.fullName}
                  className=" h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
               />
            </div>
            <div
               className="cursor-pointer font-medium text-slate-600 hover:text-slate-500"
               onClick={handleProfileNav}
            >
               {player.fullName}
            </div>
            <div className="ml-4">
               <span className="w-0">
                  {isActive ? (
                     <button
                        title="Deactivate User"
                        className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-2 pl-3 mb-2 text-sm font-medium text-black shadow-sm hover:bg-red-200"
                        onClick={openDeactivateModal}
                     >
                        <CheckCircleIcon
                           className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                           aria-hidden="true"
                        />
                     </button>
                  ) : (
                     <button
                        title="Activate User"
                        className="flex rounded-md border border-transparent bg-red-200 py-2 pr-2 pl-3 mb-2 text-sm font-medium text-black shadow-sm hover:bg-lime-200"
                        onClick={openActivateModal}
                     >
                        <XCircleIcon
                           className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                           aria-hidden="true"
                        />
                     </button>
                  )}
               </span>
            </div>
         </li>
         <PlayerDeactivationModal
            open={deactivateModalOpen}
            setOpen={setDeactivateModalOpen}
            handleDeactivate={handleDeactivate}
            name={player.firstName}
         />
         <PlayerActivationModal
            open={activateModalOpen}
            setOpen={setActivateModalOpen}
            handleActivate={handleActivate}
            name={player.firstName}
         />
      </>
   );
};
