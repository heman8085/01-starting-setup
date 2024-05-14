import React, { useContext } from "react";
import { ExpenseContext } from "../../store/ExpenseContext";

const ProfileDisplay = () => {
  const { fullName, profilePhoto } = useContext(ExpenseContext);

  return (
    <div>
      <img src={profilePhoto} alt="Profile" />
      <h2>{fullName}</h2>
    </div>
  );
};

export default ProfileDisplay;
