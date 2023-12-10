import React, { createContext, useContext, useEffect, useState } from 'react'
import axiosClient from '../axios';

const StateContext = React.createContext({
        currentUser:{},
        setCurrentUser:() => {},
        userToken:null,
        setUserToken:() => {},
      });

export const ContextProvider = ({ children }) => {
  const [currentUser,setCurrentUser] = useState({});
  const [userToken,_setUserToken] = useState(null);
  const [posts,setPosts] = useState([]);
  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token)
    } else {
      localStorage.removeItem('TOKEN')
    }
    _setUserToken(token);
  }

  useEffect(() => {
    if (localStorage.getItem('TOKEN')) {
      _setUserToken(localStorage.getItem('TOKEN'));
      const fetchUser = () => {
        axiosClient.get("/user")
        .then(res => {
          setCurrentUser(res.data);
          // setUserToken(res.data.token.id)
        })
        .catch (err => {
          console.error(err)
        })
      };
      fetchUser();
    }
  },[])


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
