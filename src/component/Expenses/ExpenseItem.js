import React, {useState} from 'react';


import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";
import Card from "../UI/Card";

const ExpenseItem = (props) => {

  const [amount, setAmount] = useState(props.amount);
  
  const clickHandler = () => {
    setAmount('100');
  }
  return (
    <li>
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <ExpenseDetails
        title={props.title}
        LocationOfExpenditure={props.LocationOfExpenditure}
        amount={amount}
      />
      <button onClick={clickHandler}>change amount</button>
      </Card>
    </li>
  );
};

export default ExpenseItem;
