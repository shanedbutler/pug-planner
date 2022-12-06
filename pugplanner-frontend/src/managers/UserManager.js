const apiUrl = "https://localhost:7066"

/**
 * Get fetch user from database by email and sets user to localStorage
 * @param {string} email 
 * @returns User object or undefined if user not found
 */
export const login = (email) => {
    return fetch(`${apiUrl}/api/user/get?email=${email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id) {
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
   * Parses current user from localStorage
   * @returns User object
   */
  export const getCurrentUser = () => {
    const currentUser = localStorage.getItem("userProfile");

    return JSON.parse(currentUser); 
  };