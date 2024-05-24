import React from "react";
import NewExpense from "../../NewExpense/NewExpense";
import Expenses from "../../Expenses/main/Expenses";

const Home = () => {
  return (
    <>
      <NewExpense />
      <Expenses />
    </>
  );
};

export default Home;
