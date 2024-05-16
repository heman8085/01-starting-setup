import { createContext ,useEffect,useState} from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [expenseList, setExpenseList] = useState([]);
    
    useEffect(() => {
        const fetchExpenseData = async() => {
            try {
                const response = await fetch("https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses.json");
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    const expenseData = data ? Object.values(data) : [];
                    setExpenseList(expenseData);
                }else {
                    throw new Error('failed to fetch form data');
                }
            } catch (error) {
                console.log("Error in fetching expense data", error)
             }
        }
        fetchExpenseData();
     },[setExpenseList])


    return (
        <DataContext.Provider value={{expenseList,setExpenseList}}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProvider };