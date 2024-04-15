import React from 'react';

import '../assets/Styles/authStyle.css';

const handleFocusEmail = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.placeholder = '';
};

const handleBlurEmail = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.placeholder = 'Логин или E-mail';
};

const handleFocusPassword = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.placeholder = '';
};

const handleBlurPassword = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.placeholder = 'Пароль';
};

const handleBlurRepeatPassword = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.placeholder = 'Повторите пароль';
};

const handleBlurFName = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.placeholder = 'Имя';
};

const handleBlurLName = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.placeholder = 'Фамилия';
};

const handleBlurLogin = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.placeholder = 'Логин';
};

class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="form">
          <div className="logo">
            <img src="assets/icons/logo.png" />
          </div>
          <div className="login" id="login">
            <form action="/" method="post">
              <div className="field-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="personLogo"
                  viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Логин или E-mail"
                  onFocus={handleFocusEmail}
                  onBlur={handleBlurEmail}
                />
              </div>
              <div className="field-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="lockLogo"
                  viewBox="0 0 16 16">
                  <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1m2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224" />
                  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                </svg>
                <input
                  type="text"
                  id="password"
                  name="username"
                  placeholder="Пароль"
                  onFocus={handleFocusPassword}
                  onBlur={handleBlurPassword}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="image" id="image">
          <img src="assets/icons/auth.png" />
        </div>
      </div>
    );
  }
}

class SignUpPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="login" id="login">
          <form action="/" method="post">
            <div className="fields-wrap">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Логин"
                onFocus={handleFocusEmail}
                onBlur={handleBlurLogin}
              />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="E-mail"
                onFocus={handleFocusEmail}
                onBlur={handleBlurEmail}
              />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Имя"
                onFocus={handleFocusEmail}
                onBlur={handleBlurFName}
              />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Фамилия"
                onFocus={handleFocusEmail}
                onBlur={handleBlurLName}
              />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Пароль"
                onFocus={handleFocusEmail}
                onBlur={handleBlurPassword}
              />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Повторите пароль"
                onFocus={handleFocusEmail}
                onBlur={handleBlurRepeatPassword}
              />
            </div>
          </form>
        </div>
        <div className="image" id="image">
          <img src="../assets/icons/signup.png" />
        </div>
      </div>
    );
  }
}

class ForgotPasswordPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="login" id="login">
          <form action="/" method="post">
            <div className="field-wrap">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="E-mail"
                onFocus={handleFocusEmail}
                onBlur={handleBlurEmail}
              />
            </div>
          </form>
        </div>
        <div className="image" id="image">
          <img src="assets/icons/forgot.png" />
        </div>
      </div>
    );
  }
}

export function Auth({ state }: { state: string }) {
  return (
    <div>
      {state == 'forgot' ? (
        <div>
          <ForgotPasswordPage />
          <div className="buttons">
            <a href="#" className="back" onClick={() => (state = 'login')}>
              Вернуться к окну входа
            </a>
          </div>
          <button className="button button-block">Восстановить пароль</button>
        </div>
      ) : state == 'login' ? (
        <div>
          <LoginPage />
          <div className="buttons">
            <a href="#" className="back" onClick={() => (state = 'login')}>
              Вернуться к окну входа
            </a>
          </div>
          <button className="button button-block">Регистрация</button>
        </div>
      ) : (
        <div>
          <SignUpPage />
          <div className="buttons">
            <a href="#" className="forgot" onClick={() => (state = 'forgot')}>
              Забыли пароль?
            </a>
            <a href="#" className="signUp" onClick={() => (state = 'login')}>
              Регистрация
            </a>
          </div>
          <button className="button button-block">Войти</button>
        </div>
      )}
    </div>
  );
}
