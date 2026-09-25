import React, { Children, createContext, useState } from "react";

export let UserProvider = createContext();

const UserContext = ({ children }) => {
  let [user, setUser] = useState(()=>{
    return localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
  }); // {} // null
  let login = (data) => {
    setUser(data);
    localStorage.setItem('user' ,JSON.stringify(data) )
  };
  let logout = ()=>{
    setUser(null)
    localStorage.removeItem('user')
  }
  return (
    <UserProvider.Provider value={{ user , login , logout }}>{children}</UserProvider.Provider>
  );
};

export default UserContext;
