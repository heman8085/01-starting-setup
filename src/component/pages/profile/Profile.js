import React, { useState } from "react";
import classes from "./Profile.module.css";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
  let idTokens = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAhtkhxPzQ_tsBn9XwbMowkROKCMOYXI54",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: idTokens,
              displayName: fullName,
              photoUrl: profilePhoto,
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
        const profileData = await response.json();
        console.log(profileData);
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <section className={classes.profile_card}>
      <h1>Contact Details</h1>
      <form className={classes.profile} onSubmit={handleUpdate}>
        <div className={classes.control}>
          <label htmlFor="name">Full name :</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="photo">Profile Photo URL :</label>
          <input
            type="text"
            id="photo"
            onChange={(e) => setProfilePhoto(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Update</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
