import React, { useState } from "react";
import "./LoginPage.css";
import { useHttp } from "../../hooks/http.hook";

export function LoginPage({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [wrongData, setWrongData] = useState(false);

  const { loading, request } = useHttp();

  // useEffect(() => {
  //   if (error) {
  //     setWrongData(true);
  //     clearError();
  //   }
  // }, [error]);

  const handleChange = (e) => {
    setWrongData(false);
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
      if (err.message === "Login failed") setWrongData(true);
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
          {wrongData && <p>Неверный логин/пароль</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
