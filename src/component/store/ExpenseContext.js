import { createContext, useState, useEffect } from "react";
const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [warning, setWarning] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [userDetails, setUserDetails] = useState("");

  const userIsLoggedIn = !!token;

const loginHandler = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", JSON.stringify(newToken));
  };

  useEffect(() => {
    if (userIsLoggedIn && !profileUpdated) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 4000);
    }
  }, [userIsLoggedIn,profileUpdated]);

  useEffect(() => {
      setWarning(false)
     fetchUserDetails();
  }, []);
  
  
    const fetchUserDetails = async () => {
      let idToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAhtkhxPzQ_tsBn9XwbMowkROKCMOYXI54",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: idToken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserDetails(data.users[0]);
         
          // setFullName(displayName);
          // setProfilePhoto(photoUrl);
          
            
        } else {
          setWarning(true)
          throw new Error("failed to fetch form data");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setWarning(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let idToken = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAhtkhxPzQ_tsBn9XwbMowkROKCMOYXI54",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
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
       setProfileUpdated(true);
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
        profilePhoto,
        fullName,
        fetchUserDetails,
        userDetails
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
export { ExpenseContext, ExpenseProvider };