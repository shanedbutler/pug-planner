import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPositions } from '../managers/PositionManager';
import { fetchPronouns } from '../managers/PronounManager';
import { editUserFetch, fetchUser } from '../managers/UserManager';

export const PlayerEdit = ({ userId }) => {

   const navigate = useNavigate();

   const [player, setPlayer] = useState({});
   const [positions, setPositions] = useState([]);
   const [pronouns, setPronouns] = useState([]);

   const [isPhoneValid, setIsPhoneValid] = useState(true);
   const [isEmgPhoneValid, setIsEmgPhoneValid] = useState(true);

   const firstNameRef = useRef();
   const lastNameRef = useRef();
   const emailRef = useRef();
   const phoneRef = useRef();
   const primaryRef = useRef();
   const secondaryRef = useRef();
   const pronounRef = useRef();
   const clubRef = useRef();
   const emergencyNameRef = useRef();
   const emergencyPhoneRef = useRef();

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

      if (primaryRef.current.value === 'none') {
         //handlePrimaryRequired();
      } else if (secondaryRef.current.value === 'none') {
         //handleSecondaryRequired();
      } else {
         editedUser = {
            id: player.id,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value.replace(/\D/g, ''),
            primaryPositionId: parseInt(primaryRef.current.value),
            secondaryPositionId: parseInt(secondaryRef.current.value),
            pronounId: parseInt(pronounRef.current.value),
            club: clubRef.current.value,
            emergencyName: emergencyNameRef.current.value,
            emergencyPhone: emergencyPhoneRef.current.value.replace(/\D/g, ''),
            active: player.active
         };
         editUserFetch(editedUser)
            .then(() => navigate(`/profile/${userId}`));
      }
   };

   const handleCancel = (e) => {
      e.preventDefault();
      navigate(`/profile/${userId}`);
   };

   useEffect(() => {
      fetchUser(userId).then((user) => setPlayer(user));
      fetchPositions().then((pos) => setPositions(pos));
      fetchPronouns().then((pro) => setPronouns(pro));
   }, []);

   return (
      <>
         <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl space-y-8">
               <div className="mt-10 sm:mt-0">
                  <div className="md:col-span-1">
                     <div className="px-4 sm:px-0 text-center">
                        <h3 className="text-3xl font-medium leading-6 text-gray-900">
                           Edit Profile
                        </h3>
                        <p className="mt-3 text-sm text-gray-600">
                           Make changes to your profile
                        </p>
                     </div>
                  </div>
                  <div className="md:grid md:grid-cols-2 md:gap-6 mt-5">
                     <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleSubmit}>
                           <div className="overflow-hidden shadow rounded-md">
                              <div className="bg-white px-4 py-5 sm:p-6">
                                 <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="first-name"
                                          className="block text-sm font-medium text-gray-700"
                                       >
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
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="last-name"
                                          className="block text-sm font-medium text-gray-700"
                                       >
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
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="phone"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Phone
                                       </label>
                                       <input
                                          type="tel"
                                          name="phone"
                                          id="phone"
                                          required
                                          defaultValue={player.phone}
                                          ref={phoneRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                          onBlur={(e) =>
                                             validatePhone(
                                                phoneRef.current.value,
                                                'user'
                                             )
                                          }
                                       />
                                       {!isPhoneValid && (
                                          <div className="text-sm text-red-600">
                                             Invalid format
                                          </div>
                                       )}
                                    </div>

                                    {/* <div className="col-span-6 sm:col-span-6">
                                       <label
                                          htmlFor="password"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Password
                                       </label>
                                       <input
                                          type="password"
                                          name="password"
                                          id="password"
                                          autoComplete="email"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div> */}

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="primaryPosition"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Primary Position
                                       </label>
                                       {console.log(player.primaryPositionId)}
                                       <select
                                          id="position"
                                          name="position"
                                          value={player.primaryPositionId}
                                          ref={primaryRef}
                                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                       >
                                          <option value="none" hidden>
                                             Select...
                                          </option>
                                          {positions.map((position) => (
                                             <option
                                                key={position.id}
                                                value={position.id}
                                             >
                                                {console.log(position.id, position.fullName)}
                                                {position.fullName}
                                             </option>
                                          ))}
                                       </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="secondary-position"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Secondary Position
                                       </label>
                                       <select
                                          id="secondary-position"
                                          name="secondary-position"
                                          defaultValue={player.secondaryPositionId}
                                          ref={secondaryRef}
                                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                       >
                                          <option value="none" hidden>
                                             Select...
                                          </option>
                                          {positions.map((position) => (
                                             <option
                                                key={position.id}
                                                value={position.id}
                                             >
                                                {position.fullName}
                                             </option>
                                          ))}
                                       </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="secondaryPosition"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Pronouns
                                       </label>
                                       <select
                                          id="pronouns"
                                          name="pronouns"
                                          defaultValue={player.pronounId}
                                          ref={pronounRef}
                                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                       >
                                          <option value="" hidden>
                                             Select...
                                          </option>
                                          <option value="">
                                             Prefer not to say
                                          </option>
                                          {pronouns.map((pronoun) => (
                                             <option
                                                key={pronoun.id}
                                                value={pronoun.id}
                                             >
                                                {pronoun.name}
                                             </option>
                                          ))}
                                       </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="club"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Club
                                       </label>
                                       <input
                                          type="text"
                                          name="club"
                                          id="club"
                                          placeholder="Club played in or supported..."
                                          defaultValue={player.club}
                                          ref={clubRef}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                          onBlur={(e) =>
                                             validatePhone(
                                                emergencyPhoneRef.current.value,
                                                'emergency'
                                             )
                                          }
                                       />
                                       {!isEmgPhoneValid && (
                                          <div className="text-sm text-red-600">
                                             Invalid format
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-gray-50 text-right py-5 px-5 sm:px-6">
                                 <button
                                    type="submit"
                                    className="rounded-md border border-transparent bg-lime-200 py-2 px-4 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-300 focus:bg-lime-200"
                                 >
                                    Save
                                 </button>
                                 <button
                                    className="rounded-md border border-transparent bg-rose-200 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-rose-300 focus:bg-rose-300"
                                    onClick={handleCancel}
                                 >
                                    Cancel
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
