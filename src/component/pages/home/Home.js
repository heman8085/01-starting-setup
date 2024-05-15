import React, { useState } from "react";
import NewExpense from "../../NewExpense/NewExpense";
import Expenses from "../../Expenses/main/Expenses";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "monthly rent",
    amount: 294.67,
    date: new Date(2024, 7, 14),
    category: "Housing",
  },
  {
    id: "e2",
    title: "New TV",
    amount: 799.49,
    date: new Date(2024, 2, 12),
    category: "none",
  },
  {
    id: "e3",
    title: "metro",
    amount: 94.6,
    date: new Date(2024, 4, 28),
    category: "Transportation",
  },
];

const Home = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default Home;
