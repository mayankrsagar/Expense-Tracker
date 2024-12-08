import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expensesList, setExpensesList] = useState(() => {
    return JSON.parse(localStorage.getItem("expensesList")) || [];
  });
  const [balance, setBalance] = useState(() => {
    return Number(localStorage.getItem("balance")) || 0;
  });
  const [expense, setExpense] = useState(() => {
    return Number(localStorage.getItem("expense")) || 0;
  });
  const [listId, setListId]=useState(null);
  const [chartData, setChartData] = useState([]);
  // useEffect(()=>{console.log(chartData)},[])

  useEffect(() => {
    const categories=["food", "travel", "entertainment"];
    const data = expensesList.reduce((acc, current) => {
      const { category, price } = current;
      const existingCategory = acc.find((item) => item.name === category);

      if (existingCategory) {
        existingCategory.value += Number(price);
      } else {
        acc.push({ name: category, value: Number(price) });
      }

      return acc;
    }, []);

    categories.forEach((category) => {
      const findCat = data.find((d) => d.name === category);
      if (!findCat) {
        data.push({ name: category, value: 0 });
      }
    });
    console.log(data)
    setChartData(data);
  }, [expensesList]);

  useEffect(() => {
    // Check if balance is already set in localStorage
    if (!localStorage.getItem("balance")) {
      localStorage.setItem("balance", 5000); // Set the default balance to 5000
    }
    if(!localStorage.getItem("expense")){
      localStorage.setItem("expense",0);
    }
    // Set the balance state from localStorage
    // const currentBalance = Number(localStorage.getItem("balance"));
    setBalance(5000); // Update the state to reflect the balance
    // const currentExpense=Number(localStorage.getItem("expense"));
    setExpense(0)

  },[setBalance, setExpense] ); // dependices is optional

  // to treack changes after state changes
//  useEffect(() => {
//     localStorage.setItem("expensesList", JSON.stringify(expensesList));
//     localStorage.setItem("balance", balance);
//     localStorage.setItem("expense", expense);
//   }, [expensesList, balance, expense]);
  return (
    <ExpenseContext.Provider
      value={{
        expensesList,
        setExpensesList,
        balance,
        setBalance,
        expense,
        setExpense,
        listId, 
        setListId,
        chartData,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
