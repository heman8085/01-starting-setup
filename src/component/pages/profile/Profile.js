import React, { useContext} from "react";
import classes from "./Profile.module.css";
import { ExpenseContext } from "../../store/ExpenseContext";

const Profile = () => {
  
  const { handleUpdate,setFullName,setProfilePhoto } = useContext(ExpenseContext);
  
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
