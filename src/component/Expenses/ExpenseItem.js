import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";
import Card from "../UI/Card";

const ExpenseItem = (props) => {
  const clickHandler = () => {
    const expenseCardElement = document.querySelector('.expense-item');
    const parentElement = expenseCardElement.parentNode;
    parentElement.removeChild(expenseCardElement)
  }
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <ExpenseDetails
        title={props.title}
        LocationOfExpenditure={props.LocationOfExpenditure}
        amount={props.amount}
      />
      <button onClick={clickHandler}>Delete Expense</button>
    </Card>
  );
};

export default ExpenseItem;
