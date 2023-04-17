import React, { useState } from "react";
import "./LoginPage.css";
import { useHttp } from "../../hooks/http.hook";

const errorMap = {
  "Login failed": "Неверный логин/пароль",
  "Something went wrong": "Произошла какая-то ошибка",
};

export function LoginPage({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorText, setErrorText] = useState(null);

  const { loading, request } = useHttp();

  const handleChange = (e) => {
    setErrorText(null);
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await request("/login", "POST", {
        ...formData,
      });
      login(data.token);
    } catch (err) {
      setErrorText(errorMap[err.message]);
    }
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
          {errorText && <p className="wrong-data">{errorText}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
