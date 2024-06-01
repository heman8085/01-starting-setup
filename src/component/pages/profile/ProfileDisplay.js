import React, { useContext } from "react";
import { ExpenseContext } from "../../store/auth/ExpenseContext";

const ProfileDisplay = () => {
  const { state, sendVerificationEmail } = useContext(ExpenseContext);

  return (
    <div>
      <img
        src={state.userDetails.photoUrl}
        alt="Profile"
        height={300}
        width={300}
      />
      <h2>{state.userDetails.displayName}</h2>
      <h3>
        {state.userDetails.email}
        <p>
          {state.verificationSent ? (
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
