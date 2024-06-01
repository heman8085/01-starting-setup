import React, { useContext, useState } from "react";
import ExpenseDate from "../date/ExpenseDate";
import Card from "../../UI/Card";
import "./ExpensesList.css";
import { DataContext } from "../../store/data/DataContext";

const ExpenseList = () => {
  const { filteredExpenses, removeExpense, editExpense } =
    useContext(DataContext);

  const [editingExpense, setEditingExpense] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const startEditingHandler = (expense) => {
    setEditingExpense(expense);
    setEditedTitle(expense.title);
    setEditedAmount(expense.amount);
    setEditedDate(expense.date.split("T")[0]);
    setEditedCategory(expense.category);
  };

  const stopEditingHandler = () => {
    setEditingExpense(null);
  };

  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch(
        `https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete expense.");
      }
      removeExpense(id);
      console.log("Expense deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const editExpenseHandler = async (event) => {
    event.preventDefault();

    const updatedExpense = {
      title: editedTitle,
      amount: editedAmount,
      date: new Date(editedDate).toISOString(),
      category: editedCategory,
    };

    await editExpense(updatedExpense, editingExpense.key);
    stopEditingHandler();
  };

  if (filteredExpenses.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {filteredExpenses.map((expense) =>
        editingExpense && editingExpense.key === expense.key ? (
          <li key={expense.key}>
            <Card className="expense-item">
              <form onSubmit={editExpenseHandler}>
                <div className="new-expense__controls">
                  <div className="new-expense__control">
                    <label>Description of expense</label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="new-expense__control">
                    <label>Amount Spent</label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="new-expense__control">
                    <label>Date</label>
                    <input
                      type="date"
                      min="2020-01-01"
                      max="2024-12-31"
                      value={editedDate}
                      onChange={(e) => setEditedDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="new-expense__control">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
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
                  <button type="submit">Save</button>
                </div>
              </form>
            </Card>
          </li>
        ) : (
          <li key={expense.key}>
            <Card className="expense-item">
              <ExpenseDate date={new Date(expense.date)} />
              <div className="expense-item__description">
                <h2>{expense.category}</h2>
                <h3>{expense.title}</h3>
                <div className="expense-item__price">Rs. {expense.amount}</div>
                <div>
                  <button onClick={() => startEditingHandler(expense)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => deleteExpenseHandler(expense.key)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </Card>
          </li>
        )
      )}
      {filteredExpenses.length === 1 && (
        <h2 className="expenses-list__fallback">
          Only single Expense here. Please add more...
        </h2>
      )}
    </ul>
  );
};

export default ExpenseList;
