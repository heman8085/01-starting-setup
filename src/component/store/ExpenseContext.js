import { createContext ,useState} from "react";
const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => { 
const initialToken = localStorage.getItem("token");
const [token, setToken] = useState(initialToken);


const userIsLoggedIn = !!token;

const loginHandler = (newToken) => {
  setToken(newToken);
  localStorage.setItem("token", newToken);
  
};
const logoutHandler = () => {
  setToken(null);
    localStorage.removeItem("token");
};

    return (
        <ExpenseContext.Provider value={{userIsLoggedIn,loginHandler,logoutHandler}}>
            {children}
        </ExpenseContext.Provider>
    )
}
export {ExpenseContext, ExpenseProvider}