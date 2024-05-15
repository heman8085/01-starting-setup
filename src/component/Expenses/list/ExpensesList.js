import React from "react";
import ExpenseDate from "../date/ExpenseDate";
import Card from "../../UI/Card";
import "./ExpensesList.css";

const ExpenseList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  } else {
    return (
      <ul className="expenses-list">
        {props.items.map((expense) => (
          <li key={expense.id}>
            <Card className="expense-item">
              <ExpenseDate date={expense.date} />
              <div className="expense-item__description">
                <h2>{expense.category}</h2>
                <h3>{expense.title}</h3>
                <div className="expense-item__price">$ {expense.amount}</div>
              </div>
            </Card>
          </li>
        ))}
        {props.items.length === 1 && (
          <h2 className="expenses-list__fallback">
            Only single Expense here. Please add more...
          </h2>
        )}
      </ul>
    );
  }
};

export default ExpenseList;
