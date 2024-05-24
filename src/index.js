import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { ThemeProvider } from "./component/store/ThemeContext";
import { ExpenseProvider } from "./component/store/ExpenseContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {DataProvider } from "./component/store/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
        <ExpenseProvider>
           <DataProvider>
                <App />
            </DataProvider>
    </ExpenseProvider>
  </ThemeProvider>
);
