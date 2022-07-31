import React, { createContext, useState, useContext } from 'react';
import RequestHelper from '../utils/RequestHelper';
import CookieStorage from "../utils/CookieStorage";

const UserContext = createContext();

const API = "http://localhost:1234"

const UserProvider = ({ children }) => {

  const [ User, setUser ] = useState([])

  const login = async({ username, password })=>{
    const resultLogin = await RequestHelper.post("/api/auth/login", { username, password })
    if(!resultLogin.success) return false

    const 
      userData = resultLogin.data.user,
      token = resultLogin.data.token,
      newData = {
        ...userData,
        image: API + userData.image
      }

    setUser(newData)
    CookieStorage.set("token", token)
    
    return true
  }

  return (
    <UserContext.Provider
      value={{ User, setUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext)
};

export { UserProvider, useUser };
