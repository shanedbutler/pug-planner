import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { fetchAllPositions } from '../managers/PositionManager';
import { fetchAllPronouns } from '../managers/PronounManager';
import { fetchProfileWithForeign } from '../managers/UserManager';

export const PlayerEdit = ({ userId }) => {
   const navigate = useNavigate();
   const [player, setPlayer] = useState({});

   // React-select state variables for primary position, secondary position, and pronouns
   const [positionOptions, setPositionOptions] = useState([]);
   const [primaryDefault, setPrimaryDefault] = useState({});
   const [secondaryDefault, setSecondaryDefault] = useState({});
   const [positionSelection, setPositionSelection] = useState();
   const [secondaryPositionSelection, setSecondaryPositionSelection] = useState();
   const [pronounOptions, setPronounOptions] = useState([]);
   const [pronounDefault, setPronounDefault] = useState({});
   const [pronounSelection, setPronounSelection] = useState();

   const [isPhoneValid, setIsPhoneValid] = useState(true);
   const [isEmgPhoneValid, setIsEmgPhoneValid] = useState(true);

   // UseRef hooks for all non-select inputs
   const firstNameRef = useRef();
   const lastNameRef = useRef();
   const emailRef = useRef();
   const phoneRef = useRef();
   const clubRef = useRef();
   const emergencyNameRef = useRef();
   const emergencyPhoneRef = useRef();

   /**
    * Map array values to option array and set to state for use by react-select
    * @param {*} positionsArr
    */
   const handleSetPositions = async (positionsArr) => {
      const positionOptionsArr = positionsArr.map((position) => {
         return {
            value: position.id,
            label: position.fullName,
         };
      });
      setPositionOptions(positionOptionsArr);
   };

   const handlePositionSelect = (e) => setPositionSelection(e.value);

   const handleSecondaryPositionSelect = (e) => setSecondaryPositionSelection(e.value);

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

   const handlePronounSelect = (e) => setPronounSelection(e.value);

   /**
    * Find player's currently chosen options and set them to state in the react-select format
    */
   const handleSetDefaults = (player, positions, pronouns) => {
      const userPrimary = positions.find((pos) => pos.id === player.primaryPositionId);
      const userSecondary = positions.find((pos) => pos.id === player.secondaryPositionId);
      const userPronoun = pronouns.find((pro) => pro.id === player.pronounId);

      const userPrimaryOption = {
         value: userSecondary.id,
         label: userSecondary.fullName,
      };
      const userSecondaryOption = {
         value: userPrimary.id,
         label: userPrimary.fullName,
      };
      const userPronounOption = {
         value: userPronoun.id,
         label: userPronoun.name,
      };

      //console.log(userPrimaryOption, userSecondaryOption, userPronounOption);
      setPrimaryDefault(userPrimaryOption);
      setSecondaryDefault(userSecondaryOption);
      setPronounDefault(userPronounOption);
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

   const handleSubmit = (e) => {
      e.preventDefault();
      let editedUser = {};

      if (positionSelection === '') {
         //handlePrimaryRequired();
      } else if (secondaryPositionSelection === '') {
         //handleSecondaryRequired();
      } else {
         editedUser = {
            id: player.id,
            firebaseUserId: player.firebaseUserId,
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
            active: player.active,
            admin: player.admin,
         };
         console.log('user dto to send', editedUser); // TODO: implement edit fetch
         //editUserFetch(editedUser).then(() => navigate(`/profile/${userId}`));
      }
   };

   const handleCancel = (e) => {
      e.preventDefault();
      navigate(`/profile/${userId}`);
   };


   // TODO: Broken when moving to supabase
   useEffect(() => {
      // Get data responses from api and set to variables
      const userRes = fetchProfileWithForeign(userId);
      const positionsRes = fetchAllPositions();
      const pronounsRes = fetchAllPronouns();

      // Group values into promise all, and when their values are returned set state with setter functions
      Promise.all([userRes, positionsRes, pronounsRes]).then((values) => {
         setPlayer(values[0]);
         handleSetPositions(values[1]);
         handleSetPronouns(values[2]);
         handleSetDefaults(values[0], values[1], values[2]);
      });
   }, []);

   return (
      <>
         <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl space-y-8">
               <div className="mt-10 sm:mt-0">
                  <div className="md:col-span-1">
                     <div className="px-4 sm:px-0 text-center">
                        <h3 className="text-3xl font-medium leading-6 text-gray-900">Edit Profile</h3>
                        <p className="mt-3 text-sm text-gray-600">Make changes to your profile</p>
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
                                          defaultValue={player.firstName}
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
                                          defaultValue={player.lastName}
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
                                          defaultValue={player.email}
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
                                          defaultValue={player.phone}
                                          ref={phoneRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                          onBlur={(e) => validatePhone(phoneRef.current.value, 'user')}
                                       />
                                       {!isPhoneValid && (
                                          <div className="text-sm mt-1 text-red-600">Invalid format</div>
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
                                          className="mt-1 sm:text-sm"
                                          options={positionOptions}
                                          value={primaryDefault}
                                          isSearchable={false}
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
                                          className="mt-1 sm:text-sm"
                                          options={positionOptions}
                                          value={secondaryDefault}
                                          isSearchable={false}
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
                                          className="mt-1 sm:text-sm"
                                          options={pronounOptions}
                                          value={pronounDefault}
                                          isSearchable={false}
                                          onChange={handlePronounSelect}
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label htmlFor="club" className="block text-sm font-medium text-gray-700">
                                          Club
                                       </label>
                                       <input
                                          type="text"
                                          name="club"
                                          id="club"
                                          placeholder="Club played in or supported..."
                                          defaultValue={player.club}
                                          ref={clubRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring-violet-400 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="emergency-contact-name"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Emergency Contact Name
                                       </label>
                                       <input
                                          type="text"
                                          name="emergency-contact-name"
                                          id="emergency-contact-name"
                                          required
                                          defaultValue={player.emergencyName}
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
                                          defaultValue={player.emergencyPhone}
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
                                    className="rounded-md border border-transparent bg-rose-200 py-2 px-4 mr-3 text-sm font-medium text-black shadow-sm hover:bg-rose-300 focus:bg-rose-300"
                                    onClick={handleCancel}
                                 >
                                    Cancel
                                 </button>
                                 <button
                                    type="submit"
                                    className="rounded-md border border-transparent bg-lime-200 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-lime-300 focus:bg-lime-200"
                                 >
                                    Save
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
