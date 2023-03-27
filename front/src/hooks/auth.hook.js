import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);

  const login = useCallback((jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  });

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  });

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      login(jwtToken);
    }
  }, [login]);

  return { token, login, logout };
};
