import React from 'react';
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

const ExpenseItem = (props) => {

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <h3>{props.LocationOfExpenditure}</h3>
          <div className="expense-item__price">$ {props.amount}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
