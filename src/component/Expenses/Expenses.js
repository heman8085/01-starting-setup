import React,{useState} from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";

const Expenses = (props) => {
  
  const [filteredYear, setFilteredYear] = useState('2024');
 
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  }
 
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            LocationOfExpenditure={expense.LocationOfExpenditure}
          />
        ))}
      </Card>
    </div>
  );
};

export default Expenses;
