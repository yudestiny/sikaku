import React, { createContext, useContext, useState } from 'react'

const StateContext = React.createContext({
        currentUser:{},
        setCurrentUser:() => {},
        userToken:null,
        setUserToken:() => {},
      });

export const ContextProvider = ({ children }) => {
  const [currentUser,setCurrentUser] = useState({});
  const [userToken,_setUserToken] = useState(null);
  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token)
    } else {
      localStorage.removeItem('TOKEN')
    }
    _setUserToken(token);
  }
  return (
    <StateContext.Provider value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
      }}>
      {children}
    </StateContext.Provider>
  )
};

export const useStateContext = () => useContext(StateContext);
