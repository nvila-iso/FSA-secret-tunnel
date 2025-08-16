import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";
const signupAPI = API + "/signup";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [location, setLocation] = useState("GATE");
  const [userName, setUserName] = useState();

  // TODO: signup
  const userSignup = async (url, body) => {
    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const tempToken = await result.json();
      setToken(tempToken);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: authenticate
  const regAuth = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const value = { location, signupAPI, userSignup };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
