import React, { useContext, useState } from "react";
import { ExpenseContext } from "../../store/ExpenseContext";

const ProfileDisplay = () => {
  const { userDetails } = useContext(ExpenseContext);
  const [verificationSent, setVerificationSent] = useState(false);

  const sendVerificationEmail = async () => {
    let idToken = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAhtkhxPzQ_tsBn9XwbMowkROKCMOYXI54`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
        }
      );
      const data = await response.json();
      console.log("verification response:",data)
      setVerificationSent(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  return (
    <div>
      <img src={userDetails.photoUrl} alt="Profile" height={200} width={200}/>
      <h2>{userDetails.displayName}</h2>
      <h3>
        {userDetails.email}
        <p>
          {verificationSent ? (
            <span>Verification email sent!</span>
          ) : (
            <button onClick={sendVerificationEmail}>Verify</button>
          )}
        </p>
      </h3>
    </div>
  );
};

export default ProfileDisplay;
