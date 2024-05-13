import { createContext, useState, useEffect } from "react";
const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [warning, setWarning] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);

  const userIsLoggedIn = !!token;

  useEffect(() => {
    if (userIsLoggedIn && !profileUpdated) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 4000);
    }
  }, [userIsLoggedIn, profileUpdated]);

  const loginHandler = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", JSON.stringify(newToken));
    // Check if the profile is already updated
    const storedProfileUpdated = localStorage.getItem("profileUpdated");
    if (storedProfileUpdated === "true") {
      setProfileUpdated(true);
    } else {
      setProfileUpdated(false);
    }

  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

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
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
      const profileData = await response.json();
      console.log(profileData);
      // Update profileUpdated state and store in localStorage
      setProfileUpdated(true);
      localStorage.setItem("profileUpdated", "true");

    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <ExpenseContext.Provider
      value={{
        userIsLoggedIn,
        loginHandler,
        logoutHandler,
        handleUpdate,
        setFullName,
        setProfilePhoto,
        warning,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
export { ExpenseContext, ExpenseProvider };
