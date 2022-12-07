import Avatar from "boring-avatars";
import { postOption } from "./FetchOptions";

const apiUrl = "https://localhost:7066"

/**
 * Get fetch user from database by email and sets user to localStorage
 * @param {string} email 
 * @returns User object or undefined if user not found
 */
export const login = email => {
  return fetch(`${apiUrl}/api/user/get?email=${email}`)
    .then((r) => r.json())
    .then((userProfile) => {
      if (userProfile.id) {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile
      }
      else {
        return undefined
      }
    });
};

/**
 * Clears localStorage
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
}

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

  return parsedUser.admin
};

/**
 * React component for current user's Boring Avatar
 * @returns Avatar Component
 */
export const CurrentUserAvatar = () => {

  const userFullName = getCurrentUser().fullName

  return (
    <Avatar
      size={40}
      name={userFullName}
      variant="beam"
      colors={["#F88F89", "#EEC276", "#FBF6D0", "#79C3AA", "#DDB8D9"]}
    />
  )
}