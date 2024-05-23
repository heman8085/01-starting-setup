import { createContext, useReducer, useEffect } from "react";
import { authReducer, initialAuthState } from "./authReducer";

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const loginHandler = (token, userId) => {
    dispatch({ type: "LOGIN", payload: { token, userId } });
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userId", JSON.stringify(userId));
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
     localStorage.removeItem("userId");
  };

  const setWarning = (status) => {
    dispatch({ type: "SET_WARNING", payload: status });
  };

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
        console.log("fetchUserDetails response:", data);
        dispatch({ type: "SET_USER_DETAILS", payload: data.users[0] });
      } else {
        setWarning(true);
        throw new Error("failed to fetch form data");
      }
    } catch (error) {
      console.log("Error in fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (state.isLoggedIn && !state.profileUpdated) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 4000);
    }
  }, [state.isLoggedIn, state.profileUpdated]);

  useEffect(() => {
    if (state.isLoggedIn) {
      fetchUserDetails();
    } else {
      dispatch({ type: "SET_USER_DETAILS", payload: null });
    }
  }, [state.isLoggedIn]);

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
            displayName: state.fullName,
            photoUrl: state.profilePhoto,
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
      console.log("handleUpdate response", profileData);
      dispatch({ type: "SET_PROFILE_UPDATED", payload: true });
      fetchUserDetails();
    } catch (error) {
      console.log(error);
    }
  };

   const sendVerificationEmail = async () => {
     let idToken = JSON.parse(localStorage.getItem("token"));
     try {
       const response = await fetch(
         `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAhtkhxPzQ_tsBn9XwbMowkROKCMOYXI54`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             requestType: "VERIFY_EMAIL",
             idToken: idToken,
           }),
         }
       );
       const data = await response.json();
       console.log("verification response:", data);
       dispatch({ type: "SET_VERIFICATION_SENT", payload: true });
     } catch (error) {
       console.error("Error sending verification email:", error);
     }
   };

  return (
    <ExpenseContext.Provider
      value={{
        state,
        loginHandler,
        logoutHandler,
        handleUpdate,
        fetchUserDetails,
        sendVerificationEmail,
        dispatch
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseProvider };
