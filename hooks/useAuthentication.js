import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function useAuthentication() {
  const [authentication, setAuthentication] = useState(initialState);

  const setToken = (token = null) => {
    const decoded = jwtDecode(token);

    const { exp, payload } = decoded;
    const { username } = payload;

    const newAuth = {
      ...authentication,
      exp,
      username,
    };

    setAuthentication(newAuth);

    localStorage.setItem("token", token);

    return newAuth;
  };

  const removeToken = () => {
    setAuthentication(initialState);
    localStorage.removeItem("token");
  };

  const isExpired = (exp) => {
    const dateNow = Date.now();
    if (dateNow >= exp * 1000) {
      return true;
    } else if (!exp) {
      // We are loading the page without logging in.
      // exp is undefined.
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const { username, exp } = decoded;
        setAuthentication({
          ...authentication,
          username,
          exp,
        });
        return dateNow >= exp * 1000;
      } else {
        return true;
      }
    } else {
      // We are checking localStorage if there
      // is another token.
      return dateNow >= exp * 1000;
    }
  };

  return {
    setToken,
    isExpired,
    removeToken,
    authentication,
  };
}

const initialState = {
  username: "",
};

export default useAuthentication;
