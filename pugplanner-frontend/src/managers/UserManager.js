import Avatar from "boring-avatars";
import { postOption } from "./FetchOptions";

const apiUrl = "https://localhost:7066"

/**
 * Get fetch user from database by primary key id
 * @param {int} in
 * @returns User object
 */
export const fetchUser = async id => {
  const response = await fetch(`${apiUrl}/api/user/get/${id}`);
  const user = await response.json();
  return user;
}

/**
 * Get fetch user from database by email and sets user to localStorage
 * @param {string} email 
 * @returns User object or undefined if user not found
 */
export const login = email => {
  return fetch(`${apiUrl}/api/user/get?email=${email}`)
    .then((r) => r.json())
    .then((user) => {
      if (user.id) {
        localStorage.setItem("userProfile", JSON.stringify({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          admin: user.admin
        }));
        return user
      }
      else {
        return undefined
      }
    });
};

/**
 * Removes user by clearing localStorage
 */
export const logout = () => {
  localStorage.clear()
};

/**
 * 
 * @param {UserProfile} userBody 
 * @returns GET new user object from database
 */
export const registerUser = async userBody => {
  const response = await fetch(`${apiUrl}/api/user`, postOption(userBody))
  const user = await response.json();
  return user;
};

/**
 * Parses current user from localStorage
 * @returns User object
 */
export const getCurrentUser = () => {
  const currentUser = localStorage.getItem("userProfile");
  return JSON.parse(currentUser);
};

/**
* Returns admin boolean for current user from localStorage
* @returns Boolean
*/
export const isCurrentUserAdmin = () => {
  const currentUser = localStorage.getItem("userProfile");
  const parsedUser = JSON.parse(currentUser);
  return parsedUser.admin;
};

/**
 * React component for current user's Boring Avatar
 * @returns Avatar Component
 */
export const UserAvatar = ({ fullName, id,  scale }) => {

  if (scale == null) {
    scale = 40;
  }

  return (
      <Avatar
        size={scale}
        name={fullName}
        square={false}
        variant="beam"
        colors={["#F88F89", "#EEC276", "#FBF6D0", "#79C3AA", "#DDB8D9"]}
      />
  )
};

/**
 * Gets all users that are on a game roster
 * @param {int} gameId 
 * @returns An array of user objects
 */
export const fetchRoster = async (gameId) => {
  const response = await fetch(`${apiUrl}/api/user/getRoster?gameId=${gameId}`)
  const roster = await response.json();
  return roster;
};
