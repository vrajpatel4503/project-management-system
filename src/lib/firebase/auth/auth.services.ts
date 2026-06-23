import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase.config";

// Login
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
};

// Logout
export const logoutUser = async () => {
  await signOut(auth);
};

// Reset Password
export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

// Current User
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Auth State Listener
// export const subscribeToAuth = (callback: (user: User | null) => void) => {
//   return onAuthStateChanged(auth, callback);
// };
