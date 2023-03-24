import React, { useState } from "react";
import "./LoginScreen.css";

export function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const { loggedIn } = await res.json();
      if (loggedIn) {
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 10);
        document.cookie = `loggedIn=true; expires=${expires.toUTCString()}; path=/;`;
        window.location.href = "/routeList";
      }
    }
  };

  return (
    <div className="login-screen">
      <div className="login-form-container">
        <p className="login-title">Вход</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="username"
            placeholder="Логин"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="password"
            placeholder="Пароль"
          />
          <button type="submit" className="login-btn">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
