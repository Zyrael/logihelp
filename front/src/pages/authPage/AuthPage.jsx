import React, { useState } from "react";
import "./AuthPage.css";

export function AuthPage({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [wrongData, setWrongData] = useState(false);

  const handleChange = (e) => {
    setWrongData(false);
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e) => {
    const { username, password } = formData;

    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const body = await res.json();

    if (res.ok) {
      const { token } = body;
      login(token);
    }

    setWrongData(body.message === "Not logged");
  };

  return (
    <div className="login-screen">
      <div className="login-form-container">
        <p className="login-title">Вход</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="username"
            placeholder="Логин"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="password"
            placeholder="Пароль"
          />
          {wrongData && <p>Неверный логин/пароль</p>}
          <button type="submit" className="login-btn">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
