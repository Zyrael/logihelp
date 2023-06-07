import React, { useRef, useState } from "react";
import "./LoginPage.css";
import cn from "classnames";
import { useHttp } from "../../hooks/http.hook";

const errorMap = {
  "Login failed": "Неверный логин/пароль",
  "Something went wrong": "Произошла какая-то ошибка",
};

export function LoginPage({ login }) {
  const { loading, request } = useHttp();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorText, setErrorText] = useState(null);

  // const [usernameActive, setUsernameActive] = useState(null);
  // const [passwordActive, setPasswordActive] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const onChange = (e) => {
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
    <div className="login-page">
      <div className="login-window">
        <p className="login-title">Вход</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div
            className={cn("login-input", {
              focused: focusedInput === "username",
            })}
            onClick={() => {
              usernameRef.current.focus();
              setFocusedInput("username");
              // setUsernameActive(true);
            }}
          >
            <input
              type="text"
              name="username"
              className="login-input-field"
              value={formData.username}
              onChange={onChange}
              ref={usernameRef}
              onBlur={() => {
                setFocusedInput(null);
                // setUsernameActive(!!formData.username);
              }}
              // onFocus={() => {
              //   setUsernameActive(true);
              // }}
              autoComplete="false"
            />
            <label
              htmlFor="username"
              className={cn("login-input-label", {
                // active: usernameActive,
                focused: focusedInput === "username",
              })}
            >
              Логин
            </label>
          </div>
          <div
            className={cn("login-input", {
              focused: focusedInput === "password",
            })}
            onClick={() => {
              passwordRef.current.focus();
              setFocusedInput("password");
              // setPasswordActive(true);
            }}
          >
            <input
              type="password"
              name="password"
              className="login-input-field password-input-field"
              value={formData.password}
              onChange={onChange}
              ref={passwordRef}
              onBlur={() => {
                setFocusedInput(null);
                // setPasswordActive(!!formData.password);
              }}
              // onFocus={() => {
              //   setPasswordActive(true);
              // }}
              autoComplete="false"
            />
            <label
              htmlFor="password"
              className={cn("login-input-label", {
                // active: passwordActive,
                focused: focusedInput === "password",
              })}
            >
              Пароль
            </label>
          </div>
          {errorText && <p className="login-error">{errorText}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
