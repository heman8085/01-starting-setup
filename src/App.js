import React, { useContext } from "react";
import Home from "./component/pages/home/Home";
import Navbar from "./component/navbar/Navbar";
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./component/pages/auth/Login";
import { ExpenseContext } from "./component/store/ExpenseContext";
import Profile from "./component/pages/profile/Profile";


const App = () => {
  const { userIsLoggedIn } = useContext(ExpenseContext);

  return (
    <Router>
      <Navbar />
      <Routes>
       {userIsLoggedIn && <Route path="/" element={<Home />} />}
       {userIsLoggedIn && <Route path="/profile" element={<Profile/> } />}
         {!userIsLoggedIn && <Route path="/auth" element={<Login/>} />}
      </Routes>
    </Router>
  );
};

export default App;
