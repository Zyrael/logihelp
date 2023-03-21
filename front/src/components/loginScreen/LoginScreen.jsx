import React, { useState } from "react";

export function LoginScreen() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "admin" && password === "admin") {
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      document.cookie = `loggedIn=true; expires=${expires.toUTCString()}; path=/;`;
      window.location.href = "/routeList";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.currentTarget.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
