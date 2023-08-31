import React, { useRef, useState } from "react";
import "./LoginPage.sass";
import cn from "classnames";
import { useDebounce, useHttp } from "../../hooks";
import { Loading } from "../../components";

const errorMap = {
  "Login failed": "Неверный логин/пароль",
  "Something went wrong": "Произошла какая-то ошибка",
};

export function LoginPage({ login }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const { loading, request } = useHttp();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const onChange = (e) => {
    setError(null);
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const debouncedSubmit = useDebounce(() => {
    // setError(null);
    // login(formData).catch((err) => setError(err.message));
    // try {
    //   login(formData)
    // } catch (err) {
    //   setError(err.message)
    // }

    request("/login", "POST", {
      ...formData,
    })
      .then((data) => {
        if (data.token) login(data.token);
      })
      .catch((err) => setError(err.message));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSubmit();
    // login(formData).catch((err) => setError(err.message));
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
          >
            <input
              type="text"
              name="username"
              className="login-input-field"
              value={formData.username}
              onChange={onChange}
              ref={usernameRef}
              onFocus={() => {
                setFocusedInput("username");
              }}
              onBlur={() => {
                setFocusedInput(null);
              }}
              autoComplete="username"
            />
            <div
              className={cn("login-input-border", {
                focused: focusedInput === "username",
              })}
            />
            <label
              htmlFor="username"
              className={cn("login-input-label", {
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
          >
            <input
              type="password"
              name="password"
              className="login-input-field password-input-field"
              value={formData.password}
              onChange={onChange}
              ref={passwordRef}
              onFocus={() => {
                setFocusedInput("password");
              }}
              onBlur={() => {
                setFocusedInput(null);
              }}
              autoComplete="false"
            />
            <div
              className={cn("login-input-border", {
                focused: focusedInput === "password",
              })}
            />
            <label
              htmlFor="password"
              className={cn("login-input-label", {
                focused: focusedInput === "password",
              })}
            >
              Пароль
            </label>
          </div>
          {error && <p className="login-error">{errorMap[error]}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            Войти
          </button>
        </form>
        {loading && <Loading />}
      </div>
    </div>
  );
}
