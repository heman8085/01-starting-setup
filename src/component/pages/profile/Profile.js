import React, { useContext, useState } from "react";
import classes from "./Profile.module.css";
import { ExpenseContext } from "../../store/auth/ExpenseContext";
import ProfileDisplay from "./ProfileDisplay";

const Profile = () => {
  const { handleUpdate, dispatch } = useContext(ExpenseContext);
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    dispatch({ type: "SET_FULL_NAME", payload: e.target.value });
  };

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.value);
    dispatch({ type: "SET_PROFILE_PHOTO", payload: e.target.value });
  };

  return (
    <section className={classes.profile_card}>
      <div className={classes.profile_display}>
        <ProfileDisplay />
      </div>
      <div className={classes.profile_form}>
        <form className={classes.profile} onSubmit={handleUpdate}>
          <div className={classes.control}>
            <label htmlFor="name">Full name :</label>
            <input
              type="text"
              id="name"
              value={fullName}
              onChange={handleFullNameChange}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="photo">Profile Photo URL :</label>
            <input
              type="text"
              id="photo"
              value={profilePhoto}
              onChange={handleProfilePhotoChange}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
