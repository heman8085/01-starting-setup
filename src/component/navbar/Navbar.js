import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { ExpenseContext } from "../store/ExpenseContext";

const Navbar = () => {
  const { userIsLoggedIn, logoutHandler,fetchUserDetails,profileUpdated } = useContext(ExpenseContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      logoutHandler();
      navigate("/auth");
    };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!userIsLoggedIn && (
            <li>
              <Link to="/auth">Login/SignUp</Link>
            </li>
          )}
          {userIsLoggedIn && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {userIsLoggedIn && (
            <li>
              <Link
                to="/profile"
                onClick={fetchUserDetails}
              >
                Profile
              </Link>
            </li>
          )}
          {userIsLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
