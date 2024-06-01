import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import NewExpense from "./NewExpense";
import { DataContext } from "../store/data/DataContext";

// Mock addExpense function
const mockAddExpense = jest.fn();

const renderComponent = () => {
  return render(
    <DataContext.Provider value={{ addExpense: mockAddExpense }}>
      <NewExpense />
    </DataContext.Provider>
  );
};

describe("NewExpense Component", () => {
  beforeEach(() => {
    mockAddExpense.mockClear();
  });

  test('renders "Add New Expense" button initially', () => {
    renderComponent();
    const addButton = screen.getByText("Add New Expense");
    expect(addButton).toBeInTheDocument();
  });

  test("opens and closes the form on button click", () => {
    renderComponent();
    const addButton = screen.getByText("Add New Expense");
    fireEvent.click(addButton);

    expect(screen.getByLabelText("Description of expense")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount Spent")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(
      screen.queryByLabelText("Description of expense")
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Amount Spent")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Date")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Category")).not.toBeInTheDocument();
  });

  test("submits the form with correct data", async () => {
    renderComponent();
    const addButton = screen.getByText("Add New Expense");
    fireEvent.click(addButton);

    fireEvent.change(screen.getByLabelText("Description of expense"), {
      target: { value: "Test Expense" },
    });
    fireEvent.change(screen.getByLabelText("Amount Spent"), {
      target: { value: "12.34" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2023-06-01" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Food" },
    });

    const submitButton = screen.getByText("Add Expense");
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockAddExpense).toHaveBeenCalledTimes(1));
    expect(mockAddExpense).toHaveBeenCalledWith({
      title: "Test Expense",
      amount: 12.34,
      date: "2023-06-01T00:00:00.000Z",
      category: "Food",
    });

    expect(
      screen.queryByLabelText("Description of expense")
    ).not.toBeInTheDocument();
  });

});
