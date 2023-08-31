import { useState, useCallback, useEffect } from "react";
import { useHttp } from "./http.hook";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const { loading, request } = useHttp();

  const login = useCallback((jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  }, []);

  const logout = useCallback(() => {
    request("/logout").then(() => {
      setToken(null);
      localStorage.removeItem("token");
    });
  }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (!jwtToken || import.meta.env.MODE === "mock") return;

    request("/auth", "POST", {
      token: jwtToken,
    })
      .then((data) => {
        if (data.token) {
          login(data.token);
        }
      })
      .catch((err) => {
        if (err.message === "Auth failed") {
          localStorage.removeItem("token");
        }
      });
  }, [login]);

  return { loading, token, login, logout };
};
