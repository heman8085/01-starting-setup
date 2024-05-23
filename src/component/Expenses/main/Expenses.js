import React from "react";
import Card from "../../UI/Card";
import "./Expenses.css";
import ExpenseList from "../list/ExpensesList";
import Chart from "../Chart/Chart" 
import ExpensesFilter from "../../Expenses/filter/ExpensesFilter";

const Expenses = () => {
 
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter/>
        <Chart/>
        <ExpenseList />
      </Card>
    </div>
  );
};

export default Expenses;

