import React, { createContext, useState, useContext } from 'react';
import RequestHelper from '../utils/RequestHelper';
import CookieStorage from "../utils/CookieStorage";

const UserContext = createContext();

const API = "http://localhost:1234"

const UserProvider = ({ children }) => {

  const [ user, setUser ] = useState(null)

  const login = async({ username, password })=>{
    const resultLogin = await RequestHelper.post("/api/auth/login", { username, password })
    if(!resultLogin.success) return false
    CookieStorage.set("token", resultLogin.data.token)
    return true
  }

  const logout = ()=>{
    CookieStorage.clear("token")
    window.location.reload()
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext)
};

export { UserProvider, useUser };
