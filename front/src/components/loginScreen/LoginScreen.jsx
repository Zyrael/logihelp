import React, { useState } from "react";
import "./LoginScreen.css";

export function LoginScreen() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "admin" && password === "admin") {
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);
      document.cookie = `loggedIn=true; expires=${expires.toUTCString()}; path=/;`;
      window.location.href = "/routeList";
    }
  };

  return (
    <div className="login-screen">
      <div className="login-form-container">
        <p className="login-title">Вход</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)}
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
