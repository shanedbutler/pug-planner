import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserAvatar, getLocalUser } from '../managers/UserManager';
import { logout } from '../managers/AuthManager';
import { useNavigate } from 'react-router-dom';

export const AppNav = () => {
   const navigate = useNavigate();

   const [user, setUser] = useState({});

   // Main nav bar handlers
   const navToDashboard = () => navigate('/');
   const navToPlayerAdmin = () => navigate('/players');

   // User menu handlers
   const navToProfile = () => navigate(`/profile/${user.id}`);
   const handleLogout = () => {
      logout();
      navigate('/login');
   };

   let navigation = [];
   if (user.admin) {
      navigation = [
         { name: 'Dashboard', onClick: navToDashboard, current: false },
         { name: 'Players', onClick: navToPlayerAdmin, current: false }
      ];
   } else {
      navigation = [
         { name: 'Dashboard', onClick: navToDashboard, current: false },
      ];
   }
   const userNavigation = [
      { name: 'Your Profile', onClick: navToProfile },
      { name: 'Logout', onClick: handleLogout },
   ];

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ');
   }

   useEffect(() => {
      setUser(getLocalUser());
   }, []);
   return (
      <>
         <div className="nav-bar min-h-full">
            <Disclosure as="nav" className="bg-red-100">
               {({ open }) => (
                  <>
                     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                           <div className="flex items-center">
                              <div
                                 className="cursor-pointer flex-shrink-0 border-double border-4 border-stone-500 px-3"
                                 onClick={navToDashboard}
                              >
                                 <p className="text-stone-800 font-bold text-lg">
                                    PUP
                                 </p>
                                 {/* <img
                                                className="h-8 w-8"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            /> */}
                              </div>
                              <div className="hidden sm:block">
                                 <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                       <button
                                          key={item.name}
                                          onClick={item.onClick}
                                          className={classNames(
                                             item.current
                                                ? 'bg-yellow-200 text-black'
                                                : 'text-stone-900 hover:bg-violet-100 hover:text-black',
                                             'px-3 py-2 rounded-md text-sm font-medium'
                                          )}
                                          aria-current={
                                             item.current ? 'page' : undefined
                                          }
                                       >
                                          {item.name}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           </div>
                           <div className="hidden sm:block">
                              <div className="ml-4 flex items-center sm:ml-6">
                                 <button
                                    type="button"
                                    className="rounded-full bg-red-200 p-1 text-stone-700 hover:text-black hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800"
                                 >
                                    <span className="sr-only">
                                       View notifications
                                    </span>
                                    <BellIcon
                                       className="h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 </button>

                                 {/* Profile dropdown */}
                                 <Menu as="div" className="relative ml-3">
                                    <div>
                                       <Menu.Button className="flex max-w-xs items-center rounded-full bg-red-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800">
                                          <span className="sr-only">
                                             Open user menu
                                          </span>
                                          <UserAvatar
                                             fullName={user.fullName}
                                          />
                                       </Menu.Button>
                                    </div>
                                    <Transition
                                       as={Fragment}
                                       enter="transition ease-out duration-100"
                                       enterFrom="transform opacity-0 scale-95"
                                       enterTo="transform opacity-100 scale-100"
                                       leave="transition ease-in duration-75"
                                       leaveFrom="transform opacity-100 scale-100"
                                       leaveTo="transform opacity-0 scale-95"
                                    >
                                       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 py-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <div className="flex-shrink-0 block px-4 py-2 text-sm text-stone-700 bg-violet-50">
                                             {user.fullName} <em>{user.email}</em>
                                          </div>
                                          {userNavigation.map((item) => (
                                             <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                   <div
                                                      onClick={item.onClick}
                                                      className={classNames(
                                                         active
                                                            ? 'bg-violet-50'
                                                            : '',
                                                         'cursor-pointer block px-4 py-2 text-sm text-stone-700'
                                                      )}
                                                   >
                                                      {item.name}
                                                   </div>
                                                )}
                                             </Menu.Item>
                                          ))}
                                       </Menu.Items>
                                    </Transition>
                                 </Menu>
                              </div>
                           </div>
                           <div className="-mr-2 flex sm:hidden">
                              {/* Mobile menu button */}
                              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-stone-800 hover:bg-yellow-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800">
                                 <span className="sr-only">Open main menu</span>
                                 {open ? (
                                    <XMarkIcon
                                       className="block h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 ) : (
                                    <Bars3Icon
                                       className="block h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 )}
                              </Disclosure.Button>
                           </div>
                        </div>
                     </div>

                     <Disclosure.Panel className="sm:hidden">
                        <div className="cursor-pointer space-y-1 px-2 pt-2 pb-3 sm:px-3">
                           {navigation.map((item) => (
                              <Disclosure.Button
                                 key={item.name}
                                 as="div"
                                 onClick={item.onClick}
                                 className={classNames(
                                    item.current
                                       ? 'bg-yellow-200 text-black'
                                       : 'text-stone-900 hover:bg-violet-100 hover:text-black',
                                    'block px-3 py-2 rounded-md text-base font-medium'
                                 )}
                                 aria-current={
                                    item.current ? 'page' : undefined
                                 }
                              >
                                 {item.name}
                              </Disclosure.Button>
                           ))}
                        </div>
                        <div className="border-t border-stone-800 pt-4 pb-3">
                           <div className="flex items-center px-5">
                              <div className="flex-shrink-0">
                                 <UserAvatar fullName={user.fullName} />
                              </div>
                              <div className="ml-3">
                                 <div className="text-base font-medium leading-none mb-2 text-black">
                                    {user.fullName}
                                 </div>
                                 <div className="text-sm font-medium leading-none text-stone-600">
                                    {user.email}
                                 </div>
                              </div>
                              <button
                                 type="button"
                                 className="ml-auto flex-shrink-0 rounded-full bg-yellow-200 p-1 text-stone-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800"
                              >
                                 <span className="sr-only">
                                    View notifications
                                 </span>
                                 <BellIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                 />
                              </button>
                           </div>
                           <div className="cursor-pointer mt-3 space-y-1 px-2">
                              {userNavigation.map((item) => (
                                 <Disclosure.Button
                                    key={item.name}
                                    as="div"
                                    onClick={item.onClick}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-stone-600 hover:bg-violet-100 hover:text-black"
                                 >
                                    {item.name}
                                 </Disclosure.Button>
                              ))}
                           </div>
                        </div>
                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>
         </div>
      </>
   );
};
