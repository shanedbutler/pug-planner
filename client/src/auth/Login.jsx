import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseUtils/supabaseClient';
import { ForgotPasswordModal } from '../modals/ForgotPasswordModal';

export const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [modalOpen, setModalOpen] = useState(false);
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();
      const { data, error } = await supabase.auth.signInWithPassword({
         email: email,
         password: password
      });
      if (error) {
         console.error(error);
         alert("Login Failed");
      } else {
         console.log("Login successful");
         navigate("/dashboard");
      }
   };

   const handleRecovery = async (e) => {
      e.preventDefault();
      try {
         await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://peoplespickup.com/update-password',
         });
         setModalOpen(false);
      } catch (error) {
         console.error(error);
         alert('Password reset failed, check your email address');
         setModalOpen(false);
      }
   };

   const handleOpenRecoveryModal = (e) => {
      e.preventDefault();
      if (!email) {
         alert("Please enter your email address before requesting a password reset.");
      }
      else {
         setModalOpen(true);
      }
   };

   return (
      <>
         <div className="flex min-h-full items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
               <div>
                  <img
                     className="mx-auto h-16 w-auto"
                     src="pug.svg"
                     alt="Your Company"
                  />
                  <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                     Login to Pick-Up Planner
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                     Or
                     <Link
                        to={'/register'}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                     >
                        {' '}
                        register for a new account
                     </Link>
                  </p>
               </div>
               <form className="mt-8 space-y-6">
                  <input type="hidden" name="remember" value="true" />
                  <div className="-space-y-px rounded-md shadow-xs">
                     <div>
                        <label htmlFor="email-address" className="sr-only">
                           Email address
                        </label>
                        <input
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           id="email-address"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 sm:text-sm"
                           placeholder="Email address"
                        />
                     </div>
                     <div>
                        <label htmlFor="password" className="sr-only">
                           Password
                        </label>
                        <input
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="current-password"
                           required
                           className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 sm:text-sm"
                           placeholder="Password"
                        />
                     </div>
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <input
                           id="remember-me"
                           name="remember-me"
                           type="checkbox"
                           className="h-4 w-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                           htmlFor="remember-me"
                           className="ml-2 block text-sm text-gray-900"
                        >
                           Remember me
                        </label>
                     </div>

                     <div className="text-sm">
                        <a
                           className="font-medium text-indigo-600 hover:text-indigo-500"
                           onClick={handleOpenRecoveryModal}
                        >
                           Forgot your password?
                        </a>
                     </div>
                  </div>

                  <div>
                     <button
                        onClick={handleLogin}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-300 py-2 px-4 text-sm font-medium text-black shadow-xs hover:bg-violet-200 focus:bg-violet-200"
                     >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                           <svg
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                           >
                              <path
                                 fillRule="evenodd"
                                 d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                 clipRule="evenodd"
                              />
                           </svg>
                        </span>
                        Login
                     </button>
                  </div>
               </form>
            </div>
         </div>
         <ForgotPasswordModal open={modalOpen} setOpen={setModalOpen} email={email} handleRecovery={handleRecovery} />
      </>
   );
};
