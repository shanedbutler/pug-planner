import Avatar from 'boring-avatars';
import { postOption, putOption } from './FetchOptions';

const apiUrl = 'https://localhost:7066';

/**
 * Get fetch user from database by primary key id
 * @param {int} in
 * @returns User object
 */
export const fetchUser = async (id) => {
   const response = await fetch(`${apiUrl}/api/user/get/${id}`);
   const user = await response.json();
   return user;
};

/**
 * Get fetch all users from database
 * @returns Array of user objects
 */
export const fetchUsers = async () => {
   const response = await fetch(`${apiUrl}/api/user/getall`);
   const users = await response.json();
   return users;
};

/**
 * Get fetch user from database by email and sets user to localStorage
 * @param {string} email
 * @returns User object or undefined if user not found
 */
export const login = (email) => {
   return fetch(`${apiUrl}/api/user/get?email=${email}`)
      .then((r) => r.json())
      .then((user) => {
         if (user.id) {
            localStorage.setItem(
               'userProfile',
               JSON.stringify({
                  id: user.id,
                  fullName: user.fullName,
                  email: user.email,
                  admin: user.admin,
               })
            );
            return user;
         } else {
            return undefined;
         }
      });
};

/**
 * Removes user by clearing localStorage
 */
export const logout = () => {
   localStorage.clear();
};

/**
 * Create new user via POST
 * @param {UserProfile} userBody
 * @returns GET newly created user object from database
 */
export const registerUser = async (userBody) => {
   const response = await fetch(`${apiUrl}/api/user`, postOption(userBody));
   const user = await response.json();
   return user;
};

/**
 * Edit user via PUT 
 * @param {UserProfile} userBody
 * @returns GET newly created user object from database
 */
export const editUserFetch = async (userBody) => {
   const response = await fetch(`${apiUrl}/api/user`, putOption(userBody));
   const user = await response.json();
   return user;
};

/**
 * Parses current user from localStorage
 * @returns User object
 */
export const getCurrentUser = () => {
   const currentUser = localStorage.getItem('userProfile');
   return JSON.parse(currentUser);
};

/**
 * Returns admin boolean for current user from localStorage
 * @returns Boolean
 */
export const isCurrentUserAdmin = () => {
   const currentUser = localStorage.getItem('userProfile');
   const parsedUser = JSON.parse(currentUser);
   return parsedUser.admin;
};

/**
 * React component for current user's Boring Avatar
 * @returns Avatar Component
 */
export const UserAvatar = ({ fullName, scale }) => {
   if (scale == null) {
      scale = 40;
   }
   const originalColor = ['#F88F89', '#EEC276', '#F2E8DF', '#79C3AA', '#DDB8D9'];
   const altColor = ['#86A69D', '#F2B263', '#F2E8DF', '#F2C6C2', '#F28585'];
   const altColor2 = ['#F2889B', '#F2E8DF', '#95BFA4', '#F29E38', '#F28444'];

   return (
      <Avatar
         size={scale}
         name={fullName}
         square={false}
         variant="beam"
         colors={originalColor}
      />
   );
};

/**
 * Gets all users that are on a game roster
 * @param {int} gameId
 * @returns An array of user objects
 */
export const fetchRoster = async (gameId) => {
   const response = await fetch(
      `${apiUrl}/api/user/getRoster?gameId=${gameId}`
   );
   const roster = await response.json();
   return roster;
};
