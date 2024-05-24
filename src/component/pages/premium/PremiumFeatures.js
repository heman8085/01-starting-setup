import React, { useContext } from "react";
import "./PremiumFeatures.css";
import { ThemeContext } from "../../store/ThemeContext";
import { DataContext } from "../../store/DataContext";

const PremiumFeatures = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { state2 } = useContext(DataContext);

  const downloadCSV = () => {
    const expenses = state2.expenseList;
    if (expenses.length === 0) return;

    const csvHeaders = ["Title", "Amount", "Date", "Category"];
    const csvRows = expenses.map((expense) => [
      expense.title,
      expense.amount,
      new Date(expense.date).toLocaleDateString(),
      expense.category,
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += csvHeaders.join(",") + "\n";
    csvRows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="premium-features">
      <button className={`toggle-button ${theme}`} onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
      </button>
      <button className="toggle-button" onClick={downloadCSV}>
        Download Expense File
      </button>
    </div>
  );
};

export default PremiumFeatures;
