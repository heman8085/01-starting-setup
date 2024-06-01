import React, { createContext, useReducer, useEffect } from "react";
import { expenseReducer, initialExpenseState } from "./expenseReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state2, dispatch] = useReducer(expenseReducer, initialExpenseState);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch(
          "https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses.json"
        );
        if (response.ok) {
          const data = await response.json();
          const expenseData = data
            ? Object.keys(data).map((key) => ({ ...data[key], key }))
            : [];
          dispatch({ type: "SET_EXPENSE_LIST", payload: expenseData });
        } else {
          throw new Error("Failed to fetch expense data");
        }
      } catch (error) {
        console.log("Error in fetching expense data", error);
      }
    };
    fetchExpenseData();
  }, []);

  const filterChangeHandler = (selectedYear) => {
    dispatch({ type: "SET_FILTERED_YEAR", payload: selectedYear });
  };

  const removeExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: id });
  };

  const filteredExpenses = state2.expenseList.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear().toString() === state2.filteredYear;
  });

  const addExpense = async (expenseData) => {
    try {
      const response = await fetch(
        "https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add expense.");
      }
      const newDataKey = await response.json();
      const newData = { key: newDataKey.name, ...expenseData };
      dispatch({ type: "ADD_EXPENSE", payload: newData });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
  const editExpense = async (expenseData, id) => {
    try {
      const response = await fetch(
        `https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update expense.");
      }
      dispatch({ type: "EDIT_EXPENSE", payload: { ...expenseData, key: id } });
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  return (
    <DataContext.Provider
      value={{
        state2,
        dispatch,
        filteredExpenses,
        filterChangeHandler,
        removeExpense,
        addExpense,
        editExpense,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
