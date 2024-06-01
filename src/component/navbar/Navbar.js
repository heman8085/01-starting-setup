import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { ExpenseContext } from "../store/auth/ExpenseContext";
import { DataContext } from "../store/data/DataContext";

const Navbar = () => {
  const { state, logoutHandler, fetchUserDetails } = useContext(ExpenseContext);
  const navigate = useNavigate();
  const { state2 } = useContext(DataContext);

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
          {!state.isLoggedIn && (
            <li>
              <Link to="/auth">Login/SignUp</Link>
            </li>
          )}
          {state.isLoggedIn && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {state.isLoggedIn && (
            <li>
              <Link to="/profile" onClick={fetchUserDetails}>
                Profile
              </Link>
            </li>
          )}
          <li>
            {state2.isPremium && <Link to="/premium">Activate Premium</Link>}
          </li>
          {state.isLoggedIn && (
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
