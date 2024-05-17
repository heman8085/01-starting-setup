import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [expenseList, setExpenseList] = useState([]);
  const [filteredYear, setFilteredYear] = useState("2024");

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch(
          "https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses.json"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const expenseData = data ? Object.values(data) : [];
          setExpenseList(expenseData);
        } else {
          throw new Error("failed to fetch form data");
        }
      } catch (error) {
        console.log("Error in fetching expense data", error);
      }
    };
    fetchExpenseData();
  }, [setExpenseList]);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  const filteredExpenses = expenseList.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear().toString() === filteredYear;
  });

  return (
    <DataContext.Provider
      value={{
        expenseList,
        setExpenseList,
        filteredExpenses,
        filteredYear,
        filterChangeHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
