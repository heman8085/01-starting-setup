
import React, { useContext, useState } from "react";
import Card from "../../UI/Card";
import "./Expenses.css";
import ExpenseList from "../list/ExpensesList";
import Chart from "../../Chart/Chart" 
import ExpensesFilter from "../../Expenses/filter/ExpensesFilter"
import { DataContext } from "../../store/DataContext";

const Expenses = () => {
  const [filteredYear, setFilteredYear] = useState("2024");
  const { expenseList } = useContext(DataContext);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = expenseList.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear().toString() === filteredYear;
  });

  
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of filteredExpenses) {
    const expenseMonth = new Date(expense.date).getMonth(); 
    chartDataPoints[expenseMonth].value += parseInt(expense.amount);
  }

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <Chart dataPoints={chartDataPoints} />
        <ExpenseList />
      </Card>
    </div>
  );
};

export default Expenses;

