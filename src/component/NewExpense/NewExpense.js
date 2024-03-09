import React from "react";
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';


const NewExpense = () => {
    return <div>
        <form className="new-expense">
        <ExpenseForm/>
        </form>
    </div>
}
export default NewExpense;