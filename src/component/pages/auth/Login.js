import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { ExpenseContext } from "../../store/ExpenseContext";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const { loginHandler} = useContext(ExpenseContext);
  const navigate = useNavigate();

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhtkhxPzQ_tsBn9XwbMowkROKCMOYXI54";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtkhxPzQ_tsBn9XwbMowkROKCMOYXI54";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      console.log("login post response:",data)
      loginHandler(data.idToken);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <React.Fragment>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setEnteredPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className={classes.actions}>
            {!loading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLogin && <Link to="/forgetPassword" className={classes.toggle }>forgot password?</Link>}
            {loading && <p>Sending request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
      <div className={classes.error}>
        {error && <p>{error}</p>}
        
      </div>
    </React.Fragment>
  );
};

export default Login;
