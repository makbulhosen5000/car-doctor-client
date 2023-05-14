import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  console.log("auth user--", user);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () =>{
      setLoading(true);
      signInWithPopup(auth, googleProvider);
  }
  

  // sign out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user in auth provider",currentUser);
      setLoading(false);
      if (currentUser && currentUser.email) {
        //jwt
        const loggedUser = {
          email: currentUser.email,
        };
        fetch("https://car-doctor-server-drab-delta.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            //local storage is not best place it is second best place
            console.log("jwt response--", data);
            localStorage.setItem("car-doctor-access-token", data.token);
          });
      }
      else{
        //remove jwt access token
        localStorage.removeItem("car-doctor-access-token");
      }


      //stop observing while unmounting
      return () => {
        return unsubscribe();
      };
    });
  });

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;