import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";
const signupAPI = API + "/signup";
const authAPI = API + "/authenticate";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [location, setLocation] = useState("GATE");
  const [userName, setUserName] = useState();
  const [userError, setUserError] = useState("");

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
      setToken(tempToken.token);
      setLocation("TABLET");
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: authenticate
  const regAuth = async () => {
    try {
      const response = await fetch(authAPI, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setLocation("TUNNEL");
      } else {
        setUserError(json.message);
      }
    } catch (error) {
      console.error(error);
      setUserError(error.message);
    }
  };

  const value = { location, signupAPI, userSignup, regAuth, userError };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
