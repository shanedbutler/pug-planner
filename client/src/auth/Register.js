import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { fetchPositions } from '../managers/PositionManager';
import { fetchPronouns } from '../managers/PronounManager';
import { firebaseRegister } from '../managers/AuthManager';

export const Register = () => {
   const navigate = useNavigate();

   // React-select state variables for primary position, secondary position, and pronouns
   const [positionOptions, setPositionOptions] = useState([]);
   const [positionSelection, setPositionSelection] = useState();
   const [secondaryPositionSelection, setSecondaryPositionSelection] = useState();
   const [pronounOptions, setPronounOptions] = useState([]);
   const [pronounSelection, setPronounSelection] = useState();

   const [isPhoneValid, setIsPhoneValid] = useState(true);
   const [isEmgPhoneValid, setIsEmgPhoneValid] = useState(true);

   const [isPasswordValid, setIsPasswordValid] = useState(true);

   // UseRef hooks for all non-select inputs
   const firstNameRef = useRef();
   const lastNameRef = useRef();
   const emailRef = useRef();
   const phoneRef = useRef();
   const passwordRef = useRef();
   const clubRef = useRef();
   const emergencyNameRef = useRef();
   const emergencyPhoneRef = useRef();

   /**
    * Map array values to option array and set to state for use by react-select
    * @param {*} positionsArr
    */
   const handleSetPositions = (positionsArr) => {
      const positionOptionsArr = positionsArr.map((position) => {
         return {
            value: position.id,
            label: position.fullName,
         };
      });
      setPositionOptions(positionOptionsArr);
   };

   const handlePositionSelect = (e) => {
      setPositionSelection(e.value);
   };

   const handleSecondaryPositionSelect = (e) => {
      setSecondaryPositionSelection(e.value);
   };

   /**
    * Push array values to option array and set to state for use by react-select
    * Push opt out object to end of array as last option
    * @param {*} positionsArr
    */
   const handleSetPronouns = (pronounsArr) => {
      let pronounOptionsArr = [];

      pronounsArr.forEach((pronoun) => {
         const pronounOptionObj = {
            value: pronoun.id,
            label: pronoun.name,
         };
         pronounOptionsArr.push(pronounOptionObj);
      });
      const optOutOption = { value: '', label: 'Prefer not to say' };
      pronounOptionsArr.push(optOutOption);

      setPronounOptions(pronounOptionsArr);
   };

   const handlePronounSelect = (e) => {
      setPronounSelection(e.value);
   };

   const validatePhone = (phoneNum, field) => {
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

      if (!regex.test(phoneNum) && field === 'user') {
         setIsPhoneValid(false);
      } else {
         setIsPhoneValid(true);
      }

      if (!regex.test(phoneNum) && field === 'emergency') {
         setIsEmgPhoneValid(false);
      } else {
         setIsEmgPhoneValid(true);
      }
   };

   const validatePassword = (password) => {
      const regex = /(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,}/;

      regex.test(password) ? setIsPasswordValid(true) : setIsPasswordValid(false);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      let newUser = {};

      if (positionSelection === '') {
         //handlePrimaryRequired();
      } else if (secondaryPositionSelection === '') {
         //handleSecondaryRequired();
      } else {
         newUser = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value.replace(/\D/g, ''),
            primaryPositionId: parseInt(positionSelection),
            secondaryPositionId: parseInt(secondaryPositionSelection),
            pronounId: parseInt(pronounSelection),
            club: clubRef.current.value,
            emergencyName: emergencyNameRef.current.value,
            emergencyPhone: emergencyPhoneRef.current.value.replace(/\D/g, ''),
            active: true,
         };
         firebaseRegister(newUser, passwordRef.current.value)
            .then(() => navigate("/"))
            .catch(() => alert("Registration Failed"));
      }
   };

   const handleCancel = (e) => {
      e.preventDefault();
      navigate('/login');
   };

   useEffect(() => {
      fetchPositions().then((pos) => handleSetPositions(pos));
      fetchPronouns().then((pro) => handleSetPronouns(pro));
   }, []);

   return (
      <>
         <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl space-y-8">
               <div className="mt-10 sm:mt-0">
                  <div className="md:col-span-1">
                     <div className="px-4 sm:px-0 text-center">
                        <h3 className="text-3xl font-medium leading-6 text-gray-900">Register</h3>
                        <p className="mt-3 text-sm text-gray-600">
                           Please fill out the form to create and new account and login
                        </p>
                     </div>
                  </div>
                  <div className="md:grid md:grid-cols-2 md:gap-6 mt-5">
                     <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleSubmit}>
                           <div>
                              <div className="bg-white shadow rounded-md px-4 py-5 sm:p-6">
                                 <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                       <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                          First name
                                       </label>
                                       <input
                                          type="text"
                                          name="first-name"
                                          id="first-name"
                                          autoComplete="given-name"
                                          required
                                          ref={firstNameRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                          Last name
                                       </label>
                                       <input
                                          type="text"
                                          name="last-name"
                                          id="last-name"
                                          autoComplete="family-name"
                                          required
                                          ref={lastNameRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="email-address"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Email address
                                       </label>
                                       <input
                                          type="text"
                                          name="email-address"
                                          id="email-address"
                                          autoComplete="email"
                                          required
                                          ref={emailRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                          Phone
                                       </label>
                                       <input
                                          type="tel"
                                          name="phone"
                                          id="phone"
                                          required
                                          ref={phoneRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                          onBlur={(e) => validatePhone(phoneRef.current.value, 'user')}
                                       />
                                       {!isPhoneValid && (
                                          <div className="text-sm mt-1 text-red-600">Invalid format</div>
                                       )}
                                    </div>

                                    <div className="col-span-6 sm:col-span-6">
                                       <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                          Password
                                       </label>
                                       <input
                                          ref={passwordRef}
                                          type="password"
                                          name="password"
                                          id="password"
                                          autoComplete="email"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                          onBlur={(e) => validatePassword(passwordRef.current.value)}
                                       />
                                       {!isPasswordValid && (
                                          <div className="text-sm mt-1 text-red-600">Must be at least 6 characters long</div>
                                       )}
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="primaryPosition"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Primary Position
                                       </label>
                                       <Select
                                          id="position"
                                          name="position"
                                          className="mt-1 rounded-md shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                          options={positionOptions}
                                          onChange={handlePositionSelect}
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="secondary-position"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Secondary Position
                                       </label>
                                       <Select
                                          id="secondary-position"
                                          name="secondary-position"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                          options={positionOptions}
                                          onChange={handleSecondaryPositionSelect}
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="secondaryPosition"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Pronouns
                                       </label>
                                       <Select
                                          id="pronouns"
                                          name="pronouns"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                          options={pronounOptions}
                                          onChange={handlePronounSelect}
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label htmlFor="club" className="block text-sm font-medium text-gray-700">
                                          Club Supported
                                       </label>
                                       <input
                                          type="text"
                                          name="club"
                                          id="club"
                                          ref={clubRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="emergency-contact-name"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Emergency Contact First Name
                                       </label>
                                       <input
                                          type="text"
                                          name="emergency-contact-name"
                                          id="emergency-contact-name"
                                          required
                                          ref={emergencyNameRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="emergency-contact-phone"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Emergency Contact Phone
                                       </label>
                                       <input
                                          type="tel"
                                          name="emergency-contact-phone"
                                          id="emergency-contact-phone"
                                          required
                                          ref={emergencyPhoneRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                          onBlur={(e) => validatePhone(emergencyPhoneRef.current.value, 'emergency')}
                                       />
                                       {!isEmgPhoneValid && (
                                          <div className="text-sm mt-1 text-red-600">Invalid format</div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-gray-50 shadow rounded-md text-right -mt-2 py-6 px-3 sm:px-6">
                                 <button
                                    className="rounded-md border border-transparent bg-rose-100 py-2 px-4 mr-3 text-sm font-medium text-black shadow-sm hover:bg-rose-200 focus:bg-rose-200"
                                    onClick={handleCancel}
                                 >
                                    Cancel
                                 </button>
                                 <button
                                    type="submit"
                                    className="rounded-md border border-transparent bg-violet-100 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-violet-200 focus:bg-violet-200"
                                 >
                                    Register
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
