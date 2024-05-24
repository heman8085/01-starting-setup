import React, { useContext } from "react";
import Home from "./component/pages/home/Home";
import Navbar from "./component/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/pages/auth/Login";
import { ExpenseContext } from "./component/store/ExpenseContext";
import Profile from "./component/pages/profile/Profile";
import "./App.css";
import ForgetPassword from "./component/pages/auth/ForgetPassword";
import PremiumFeatures from "./component/pages/premium/PremiumFeatures";
import { ThemeContext } from "./component/store/ThemeContext";

const App = () => {
  const { state } = useContext(ExpenseContext);
  const userIsLoggedIn = !!state.token;
  const { warning } = state;
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <Navbar />
        <Routes>
          {userIsLoggedIn && <Route path="/" element={<Home />} />}
          {userIsLoggedIn && <Route path="/profile" element={<Profile />} />}
          {userIsLoggedIn && (
            <Route path="/premium" element={<PremiumFeatures />} />
          )}
          {!userIsLoggedIn && <Route path="/auth" element={<Login />} />}
          {!userIsLoggedIn && (
            <Route path="/forgetPassword" element={<ForgetPassword />} />
          )}
        </Routes>

        {warning && (
          <div className="warning">
            Your profile is incomplete. Complete it now !!
          </div>
        )}
      </Router>
    </div>
  );
};

export default App;
