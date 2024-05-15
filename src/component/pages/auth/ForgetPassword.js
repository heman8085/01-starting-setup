import React, { useState } from "react";
import classes from "./Login.module.css";

const ForgetPassword = () => {
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [email, setEmail] = useState(""); 
  

  const forgetPasswordHandler = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAhtkhxPzQ_tsBn9XwbMowkROKCMOYXI54`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );
      const data = await response.json();
      console.log(" password reset response:",data);
      setPasswordResetSent(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <section className={classes.auth}>
      <div className={classes.control}>
        <label htmlFor="email">
          Enter the email with which you have registered
        </label>
        <input
          type="email"
          id="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
      </div>
      <div className={classes.actions}>
        <button onClick={forgetPasswordHandler}>Send Link</button>
        {passwordResetSent && <p>Password reset email sent!</p>}
      </div>
    </section>
  );
};

export default ForgetPassword;
