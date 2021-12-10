import React, { useEffect, useState } from "react";
import app from "./base.js";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const initialEmptyUser = {
  token: null,
  accNumber: null,
  isLoggedIn: false
}

export const AuthContext = React.createContext({token: null, accNumber: null, isLoggedIn: false, login: (user) => {}, logout: ()=>{}, setPending: (value) => {}});

export const AuthProvider = (props) => {
    const auth = getAuth(app);

    let initial = localStorage.getItem('user');
    if(initial){
      initial  = JSON.parse(initial);
    }
    else{
      initial = initialEmptyUser;
    }
    const [currentUser, setCurrentUser] = useState(initial);
    const [pending, setPendingState] = useState(true);

    const LoginHandler = (user) => {

      const accNumber = user?.email.split('@')[0];
      const newCurrentUser = {token: user.accessToken, accNumber, isLoggedIn: true};

      localStorage.setItem('user', JSON.stringify(newCurrentUser));
      setCurrentUser({token: user.accessToken, accNumber, isLoggedIn: true});
      setPendingState(false);
    }

    const LogoutHandler = () => {

      localStorage.clear();

      setCurrentUser(initialEmptyUser);
      setPendingState(false);
    }

    const PendingHandler = (value) => {
      setPendingState(value);
    }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user){
          const accNumber = user?.email.split('@')[0];
          setCurrentUser({token: user.accessToken, accNumber, isLoggedIn: true})
        }
        else{
          setCurrentUser({token: null, accNumber: null, isLoggedIn: false});
        }
        setPendingState(false)
    });
  }, [auth]);

  if(pending){
    return <>Loading...</>
  }

  const contextValue = {
    token: currentUser.token,
    accNumber: currentUser.accNumber,
    isLoggedIn: currentUser.isLoggedIn,
    login: LoginHandler,
    logout: LogoutHandler,
    setPending: PendingHandler
  }

  return (
    <AuthContext.Provider
      value={
        contextValue
      }
    >
      {props.children}
    </AuthContext.Provider>
  );
};