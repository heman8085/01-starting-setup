import React, { useContext } from "react";
import "./ExpensesFilter.css";
import { DataContext } from "../../store/DataContext";

const ExpensesFilter = () => {
  const { filteredYear, filterChangeHandler } = useContext(DataContext);

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select
          value={filteredYear}
          onChange={(e) => filterChangeHandler(e.target.value)}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
