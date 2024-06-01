import React, { useContext, useState } from "react";
import "./NewExpense.css";
import { DataContext } from "../store/data/DataContext";

const NewExpense = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  const { addExpense } = useContext(DataContext);

  const saveExpenseDataHandler = async (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: parseFloat(enteredAmount),
      date: new Date(enteredDate).toISOString(),
      category: enteredCategory,
    };

    await addExpense(expenseData);

    // Clear the input fields
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredCategory("");
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button type="button" onClick={startEditingHandler}>
          Add New Expense
        </button>
      )}
      {isEditing && (
        <form onSubmit={saveExpenseDataHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label htmlFor="text">Description of expense</label>
              <input
                type="text"
                id="text"
                value={enteredTitle}
                onChange={(e) => setEnteredTitle(e.target.value)}
                required
              />
            </div>
            <div className="new-expense__control">
              <label htmlFor="num">Amount Spent</label>
              <input
                type="number"
                id="num"
                min="0.01"
                step="0.01"
                value={enteredAmount}
                onChange={(e) => setEnteredAmount(e.target.value)}
                required
              />
            </div>
            <div className="new-expense__control">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                min="2020-01-01"
                max="2024-12-31"
                value={enteredDate}
                onChange={(e) => setEnteredDate(e.target.value)}
                required
              />
            </div>
            <div className="new-expense__control">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={enteredCategory}
                onChange={(e) => setEnteredCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Clothing">Clothing</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
          <div className="new-expense__actions">
            <button type="button" onClick={stopEditingHandler}>
              Cancel
            </button>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewExpense;
