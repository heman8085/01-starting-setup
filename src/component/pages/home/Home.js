import React, {  } from "react";
import NewExpense from "../../NewExpense/NewExpense";
import Expenses from "../../Expenses/main/Expenses";
import { DataProvider } from "../../store/DataContext";

const Home = () => {
  // const [expenses, setExpenses] = useState([]);

  // const addExpenseHandler = (expense) => {
  //   const expenseWithDateObject = {
  //     ...expense,
  //     date: new Date(expense.date),
  //   };
  //   setExpenses((prevExpenses) => {
  //     return [expenseWithDateObject, ...prevExpenses];
  //   });
  // };
  
  return (
    <DataProvider>
      <NewExpense/>
      <Expenses/>
    </DataProvider>
  );
};

export default Home;
