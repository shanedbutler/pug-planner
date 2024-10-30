import { ChevronLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { UserAvatar } from '../managers/UserManager';

export const PlayerProfile = () => {
   const { id } = useParams();
   const { userProfile, isLoading } = useLoaderData();

   const navigate = useNavigate();

   const navToProfileEdit = () => {
      navigate('/profile/edit');
   };

   if (!isLoading) {
      return (
         <div className="px-5 py-5 max-w-md mx-auto sm:max-w-lg">
            {userProfile.id === id && (
               <div className="flex -mb-10">
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
                  <div className='px-2'>
                     <ChevronLeftIcon className="h-6 w-6 text-slate-600 cursor-pointer hover:text-violet-500" aria-hidden="true" onClick={() => navigate(-1)} />
                  </div>
                  <div className="flex flex-wrap justify-center">
                     <div className="w-full flex justify-center">
                        <div className="border-none -m-16">
                           <UserAvatar fullName={userProfile.fullName} scale={110} />
                        </div>
                     </div>
                     <div className="w-full text-center mt-10">
                        <div className="flex justify-center pt-2">
                           <div className="w-35 p-3 text-center">
                              <span className="block uppercase tracking-wide text-slate-700">
                                 {userProfile.appearances[0].count}
                              </span>
                              <span className="text-sm text-slate-400">
                                 Appearances
                              </span>
                           </div>
                           <div className="w-35 p-3 text-center">
                              <span className="block uppercase tracking-wide text-slate-700">
                                 {userProfile.primaryPosition.name} / {userProfile.secondaryPosition.name}
                              </span>
                              <span className="text-sm text-slate-400">
                                 Positions
                              </span>
                           </div>
                           <div className="w-35 p-3 text-center">
                              <span className="block uppercase tracking-wide text-slate-700">
                                 {parseInt(userProfile.createDateTime)}
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
                        {userProfile.fullName}
                     </h3>
                     <div className="text-sm mt-0 mb-2 text-slate-400">
                        {userProfile.pronoun?.name}
                        <div className="mt-1">{userProfile.club}</div>
                        {userProfile.admin && (
                           <>
                              <div className="mt-1">{userProfile.phone}</div>
                              <div className="mt-1">{userProfile.email}</div>
                              <div className="mt-1">
                                 Emergency contact: {userProfile.emergencyName} at {userProfile.emergencyPhone}
                              </div>
                           </>
                        )}
                     </div>
                  </div>
                  <div className="mt-5 pt-6 border-t border-slate-200 text-center">
                     <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4">
                           <p className="text-sm text-slate-700 mb-4">
                              A player of considerable range, {userProfile.firstName} is the name taken
                              by the LA-based athlete. {userProfile.firstName} is
                              considered to excel at shear speed and determination. {userProfile.firstName} is
                              a supporter of {userProfile.club}.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
};
