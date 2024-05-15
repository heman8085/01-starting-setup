import React, { useState } from "react";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  const saveExpenseDataHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
      category: enteredCategory,
    };

    props.onAddExpense(expenseData);
    setIsEditing(false);

    // Clear the input fields
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredCategory("");
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
        <button type="submit" onClick={startEditingHandler}>
          Add New Expense
        </button>
      )}
      {isEditing && (
        <form onSubmit={saveExpenseDataHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Description of expense</label>
              <input
                type="text"
                value={enteredTitle}
                onChange={(e) => setEnteredTitle(e.target.value)}
              />
            </div>
            <div className="new-expense__control">
              <label>Amount Spent</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={enteredAmount}
                onChange={(e) => setEnteredAmount(e.target.value)}
              />
            </div>
            <div className="new-expense__control">
              <label>Date</label>
              <input
                type="date"
                min="2020-01-01"
                max="2024-12-31"
                value={enteredDate}
                onChange={(e) => setEnteredDate(e.target.value)}
              />
            </div>
            <div className="new-expense__control">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={enteredCategory}
                onChange={(e) => setEnteredCategory(e.target.value)}
              >
                <option value="food">Food</option>
                <option value="clothing">Clothing</option>
                <option value="housing">Housing</option>
                <option value="transportation">Transportation</option>
                <option value="none">None</option>
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
