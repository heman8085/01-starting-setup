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

export const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXPENSE_LIST":
      return {
        ...state,
        expenseList: action.payload,
        isPremium: calculateIsPremium(action.payload),
      };
    case "SET_FILTERED_YEAR":
      return { ...state, filteredYear: action.payload };
    case "REMOVE_EXPENSE":
      const updatedExpenseList = state.expenseList.filter(
        (expense) => expense.key !== action.payload
      );
      return {
        ...state,
        expenseList: updatedExpenseList,
        isPremium: calculateIsPremium(updatedExpenseList),
      };
    case "ADD_EXPENSE":
      const newExpenseList = [...state.expenseList, action.payload];
      return {
        ...state,
        expenseList: newExpenseList,
        isPremium: calculateIsPremium(newExpenseList),
      };
    case "EDIT_EXPENSE":
      const editedExpenseList = state.expenseList.map((expense) =>
        expense.key === action.payload.key
          ? { ...expense, ...action.payload }
          : expense
      );
      return {
        ...state,
        expenseList: editedExpenseList,
        isPremium: calculateIsPremium(editedExpenseList),
      };
    default:
      return state;
  }
};
