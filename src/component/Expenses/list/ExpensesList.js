import React, {useContext} from "react";
import ExpenseDate from "../date/ExpenseDate";
import Card from "../../UI/Card";
import "./ExpensesList.css";
import { DataContext } from "../../store/DataContext";

const ExpenseList = () => {
  const {filteredExpenses } = useContext(DataContext);

  if (filteredExpenses.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  } else {
    return (
      <ul className="expenses-list">
        {filteredExpenses.map((expense, index) => (
          <li key={index}>
            <Card className="expense-item">
              <ExpenseDate date={new Date(expense.date)} />
              <div className="expense-item__description">
                <h2>{expense.category}</h2>
                <h3>{expense.title}</h3>
                <div className="expense-item__price">$ {expense.amount}</div>
              </div>
            </Card>
          </li>
        ))}
        {filteredExpenses.length === 1 && (
          <h2 className="expenses-list__fallback">
            Only single Expense here. Please add more...
          </h2>
        )}
      </ul>
    );
  }
};

export default ExpenseList;
