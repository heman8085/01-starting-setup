import React, {useState } from "react";
import './ExpenseForm.css';

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle]= useState('');
    const [enteredAmount, setEnteredAmount]= useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');
    
  

    const submitHandler = (event) => {
      event.preventDefault();
      
        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
          date: new Date(enteredDate),
          LocationOfExpenditure: enteredLocation  
        }
      props.onSaveExpenseData(expenseData);
      
      //clear the input fields
      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
      setEnteredLocation("");

}

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={(e) => setEnteredTitle(e.target.value)}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
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
          <label>Location</label>
          <input
            type="text"
            value={enteredLocation}
            onChange={(e) => setEnteredLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}
export default ExpenseForm;
