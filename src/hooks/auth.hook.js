import { useState, useCallback, useEffect } from "react";
import { useHttp } from "./http.hook";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const { loading, request } = useHttp();

  const login = useCallback(async (loginData) => {
    const data = await request("/login", "POST", {
      ...loginData,
    });

    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    }
  }, []);

  const logout = useCallback(() => {
    request("/logout").then(() => {
      setToken(null);
      localStorage.removeItem("token");
    });
  }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (!jwtToken) return;

    request("/auth", "POST", {
      token: jwtToken,
    })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
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
