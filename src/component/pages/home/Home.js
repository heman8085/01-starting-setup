import React, {  } from "react";
import NewExpense from "../../NewExpense/NewExpense";
import Expenses from "../../Expenses/main/Expenses";
import { DataProvider } from "../../store/DataContext";

const Home = () => {
  
  return (
    <DataProvider>
      <NewExpense/>
      <Expenses/>
    </DataProvider>
  );
};

export default Home;
