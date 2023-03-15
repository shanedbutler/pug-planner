import { auth } from "../index"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getOption, postOption } from "./FetchOptions";

const _apiUrl = "https://localhost:7066/api/User";

// Use npm to install the firebase library: npm install firebase. <= Done, although look into only importing auth part of firebase
// Create a UserProfileProvider component and a UserProfileContext context in a UserProfileProvider.js file.
// Add login, logout and register functions to the UserProfileProvider.
// Add an isLoggedIn boolean to the UserProfileProvider's state.
// Update fetch() calls throughout the app to include an Authorization header that uses the Firebase token.

/**
 * Checks if Firebase user exists in application database
 * @param {*} firebaseUserId 
 * @returns 
 */
const _doesUserExist = async (firebaseUserId) => {
  const token = await getToken();
  const response = await fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, getOption(token));
  const user = await response.json();
  return user;
};

/**
 * Saves newly registered user to application database with Firebase Id
 * @param {user} userBody 
 * @returns {user}
 */
const _saveUser = async (userBody) => {
  const token = await getToken();
  const response = await fetch(`${_apiUrl}/api/user`, postOption(userBody, token));
  const user = await response.json();
  return user;
};

/**
 * Calls Firebase getIdToken() for the current user.
 * @returns a deserialized JSON Web Token (JWT) used to identify the user to a Firebase service
 */
export const getToken = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return user.getIdToken();
};

/**
 * Use Firebase to authenticate user with Email and Password. Checks if user exists in application database.
 * Sets user data to localStorage if login is successful.
 * @param {string} email 
 * @param {string} pw 
 * @returns 
 */
export const firebaseLogin = async (email, pw) => {
  try {
    const signInResponse = await signInWithEmailAndPassword(auth, email, pw);
    const user = await _doesUserExist(signInResponse.user.uid);
    if (!user) {
      logout();
      throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
    } else {
      _onLoginStatusChangedHandler(true);
      localStorage.setItem(
        'userProfile',
        JSON.stringify({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          admin: user.admin,
        })
      );
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Signs out the current user from Firebase auth and removes object from local storage.
 */
export const logout = () => {
  auth.signOut();
  localStorage.removeItem('userProfile');
};

/**
 * Registers new user with Firebase and saves to application database.
 * Automatically logs in user on successful creation of account.
 * @param {user} userProfile 
 * @param {string} password 
 * @returns 
 */
export const firebaseRegister = (userProfile, password) => {
  return createUserWithEmailAndPassword(auth, userProfile.email, password)
    .then((createResponse) => _saveUser({
      ...userProfile,
      firebaseUserId: createResponse.user.uid
    }).then(() => _onLoginStatusChangedHandler(true)));
};

/**
 * Get currently logged in Firebase user from application database.
 * @returns User object
 */
export const me = () => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json()),
  );
};

// This function will be overwritten when the react app calls `onLoginStatusChange` with callback function
let _onLoginStatusChangedHandler = () => {
  throw new Error("There's no login status change handler. Did you forget to call 'onLoginStatusChange()'?")
};

/**
 * Sets up mechanism for notifying the react app when the user logs in or out.
 * @param {*} onLoginStatusChangedHandler 
 */
export const onLoginStatusChange = (onLoginStatusChangedHandler) => {

  // Here we take advantage of the firebase 'onAuthStateChanged' observer in a couple of different ways.
  // 
  // The first callback, 'initialLoadLoginCheck', will run once as the app is starting up and connecting to firebase.
  //   This will allow us to determine whether the user is already logged in (or not) as the app loads.
  //   It only runs once because we immediately cancel it upon first run.
  //
  // The second callback, 'logoutCheck', is only concerned with detecting logouts.
  //   This will cover both explicit logouts (the user clicks the logout button) and session expirations.
  //   The responsibility for notifying the react app about login events is handled in the 'login' and 'register'
  //   functions located elsewhere in this module. We must handle login separately because we have to do a check
  //   against the app's web API in addition to authenticating with firebase to verify a user can login.
  const unsubscribeFromInitialLoginCheck =
    auth.onAuthStateChanged(function initialLoadLoginCheck(user) {
      unsubscribeFromInitialLoginCheck();
      onLoginStatusChangedHandler(!!user);

      auth.onAuthStateChanged(function logoutCheck(user) {
        if (!user) {
          onLoginStatusChangedHandler(false);
        }
      });
    });

  // Save the callback so we can call it in the `login` and `register` functions.
  _onLoginStatusChangedHandler = onLoginStatusChangedHandler;
};
