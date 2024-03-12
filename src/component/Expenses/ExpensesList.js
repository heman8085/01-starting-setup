import React from "react";
import './ExpensesFilter.css';
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpenseList = (props) => {


    if (props.items.length === 0) {
        return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
    }
    else if (props.items.length === 1) {
        return (
    <ul className="expenses-List">
          {props.items.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            LocationOfExpenditure={expense.LocationOfExpenditure}
          />
        ))}
        <h2 className="expenses-list__fallback">
        Only single Expense here. Please add more...
        </h2>     
    </ul>   
    );
    }
    else {
        return (
            <ul className="expenses-List">
                {props.items.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        title={expense.title}
                        amount={expense.amount}
                        date={expense.date}
                        LocationOfExpenditure={expense.LocationOfExpenditure}
                    />
                ))}
            </ul>
        )
    }
}
export default ExpenseList;