export const initialExpenseState = {
  expenseList: [],
  filteredYear: "2024",
  isPremium: false,
};

// function to calculate total amount and premium status
const calculateIsPremium = (expenses) => {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  return totalAmount > 10000;
};

export const expenseReducer = (state2, action) => {
  switch (action.type) {
    case "SET_EXPENSE_LIST":
      return {
        ...state2,
        expenseList: action.payload,
        isPremium: calculateIsPremium(action.payload),
      };
    case "SET_FILTERED_YEAR":
      return { ...state2, filteredYear: action.payload };
    case "REMOVE_EXPENSE":
      const updatedExpenseList = state2.expenseList.filter(
        (expense) => expense.key !== action.payload
      );
      return {
        ...state2,
        expenseList: updatedExpenseList,
        isPremium: calculateIsPremium(updatedExpenseList),
      };
    case "ADD_EXPENSE":
      const newExpenseList = [...state2.expenseList, action.payload];
      return {
        ...state2,
        expenseList: newExpenseList,
        isPremium: calculateIsPremium(newExpenseList),
      };
    case "EDIT_EXPENSE":
      const editedExpenseList = state2.expenseList.map((expense) =>
        expense.key === action.payload.key
          ? { ...expense, ...action.payload }
          : expense
      );
      return {
        ...state2,
        expenseList: editedExpenseList,
        isPremium: calculateIsPremium(editedExpenseList),
      };
    default:
      return state2;
  }
};
