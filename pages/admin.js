import { useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

// Hooks
import useAuthentication from "../hooks/useAuthentication";

import api from "../api";

export default function Admin() {
  const router = useRouter();
  const { setToken, isExpired, removeToken } = useAuthentication();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await api.adminLogin(username, password);
    if (response.status === 200) {
      const { token } = response.data;
      const newAuth = setToken(token);
      router.push({
        pathname: "/admin-panel",
        query: {
          ...newAuth,
        },
      });
      return;
    } else {
      router.push("/");
      return;
    }
  };

  const logout = () => {
    removeToken();
  };

  return (
    <section>
      <form>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          autoComplete="true"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          autoComplete="true"
        />
        <button type="submit" onSubmit={onSubmit} onClick={onSubmit}>
          Login
        </button>
      </form>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </section>
  );
}
