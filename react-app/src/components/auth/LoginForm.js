import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../store/session";
import "./AuthForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    setEmail("demo@@.io");
    setPassword("password");
    await dispatch(login("demo@aa.io", "password"));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-container">
      <div className="form-image-container" />
      <div className="form-container">
        <div className="form-header">
          <h2>Welcome back to Calorie</h2>
          <div className="form-header-text">Get back into your routine!</div>
        </div>
        <div className="form-content-container">
          <form onSubmit={onLogin}>
            <div className="form-fields">
              <label htmlFor="email">Email</label>
              <div>
                <input
                  className="form-field-input"
                  name="email"
                  type="text"
                  value={email}
                  onChange={updateEmail}
                />
              </div>
            </div>
            <div className="form-fields">
              <label htmlFor="password">Password</label>
              <div>
                <input
                  className="form-field-input"
                  name="password"
                  type="password"
                  value={password}
                  onChange={updatePassword}
                />
              </div>
            </div>
            <Link className="account-redirect" to="/sign-up">
              <div>Don't have an account? Register now!</div>
            </Link>
            <button className="userform-btn" type="submit">
              Login
            </button>
            <button onClick={(e) => handleDemo(e)} className="demo-btn">
              Demo
            </button>
            <div className="image2-form-container"></div>
            {errors.length > 0 && (
              <div className="auth-errors">
                {errors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
