export const initialAuthState = {
  token: localStorage.getItem("token"),
  userId: null,
  isLoggedIn: !!localStorage.getItem("token"),
  warning: false,
  profileUpdated: false,
  userDetails: "",
  fullName: "",
  profilePhoto: "",
  verificationSent: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        userId: null,
        isLoggedIn: false,
        warning: false,
      };
    case "SET_WARNING":
      return {
        ...state,
        warning: action.payload,
      };
    case "SET_PROFILE_UPDATED":
      return {
        ...state,
        profileUpdated: action.payload,
      };
    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
        profileUpdated: action.payload !== null,
      };
    case "SET_FULL_NAME":
      return {
        ...state,
        fullName: action.payload,
      };
    case "SET_PROFILE_PHOTO":
      return {
        ...state,
        profilePhoto: action.payload,
      };
    case "SET_VERIFICATION_SENT":
      return {
        ...state,
        verificationSent: action.payload,
      };
    default:
      return state;
  }
};
