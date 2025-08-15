import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";
const register = API + "/signup"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [userName, setUserName] = useState();


  // TODO: signup
  const userSignup = async () => {
    try {
      const result = await fetch (register, {
        method : "POST", 
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          username: {userName}
        })
      })
      
    } catch (error) {
      
    }
  }


  // fetch(API + "/signup",
  //             {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json"
  //               },
  //               body: JSON.stringify({
  //                 username: (userName),
  //                 // password: "super-secret-999"
  //               })
  //             })

  // TODO: authenticate

  const value = { location, setUserName };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
