import React, { useRef, useState } from "react";
import "./LoginPage.css";
import cn from "classnames";
import { useHttp, useDebounce } from "../../hooks";
import { Loading } from "../../components";

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

  const [focusedInput, setFocusedInput] = useState(null);

  const onChange = (e) => {
    setErrorText(null);
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const submitFunction = async () => {
    setErrorText(null);

    try {
      const data = await request("/login", "POST", {
        ...formData,
      });
      login(data.token);
    } catch (err) {
      setErrorText(errorMap[err.message]);
    }
  };

  const debouncedSubmit = useDebounce(submitFunction);

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSubmit();
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
              onClick={() => {
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
              onClick={() => {
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
          {errorText && <p className="login-error">{errorText}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            Войти
          </button>
        </form>
        {loading && <Loading />}
      </div>
    </div>
  );
}
