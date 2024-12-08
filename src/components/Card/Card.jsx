import React, {
  useContext,
  useState,
} from 'react';

import Chart from '../Chart/Chart';
import { ExpenseContext } from '../Context/ExpenseProvider';
import BalanceWindow from '../PopUpWindow/BalanceWindow';
import ExpenseWindow from '../PopUpWindow/ExpenseWindow';
import styles from './Card.module.css';

const Card = () => {
  // const [balance, setBalance] = useState(() => {
  //   // Get initial balance from localStorage, if available and doesn't need to provide value on mount can assign direct value 
  //   const savedBalance = localStorage.getItem('balance');
  //   return savedBalance ? Number(savedBalance) : 5000; // Fallback to 5000 if not present
  // });
  
  // const [expense, setExpense] = useState(() => {
  //   // Get initial expense from localStorage, if available
  //   const savedExpense = localStorage.getItem('expense');
  //   return savedExpense ? Number(savedExpense) : 0; // Fallback to 0 if not present
  // });
  const {balance, expense}=useContext(ExpenseContext);
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance]=useState(false)

  // // Save balance and expense to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem('balance', balance);
  //   localStorage.setItem('expense', expense);
  // }, [balance, expense]);

  return (
    <React.Fragment>
      <div className={styles.balanceAndExpenses}>
        <div className={styles.balance}>
          <h1>{`Wallet Balance: ₹${balance}`}</h1>
          <button onClick={() => setIsOpenBalance(true)}>+ Add Income</button>
          <BalanceWindow  isOpenBalance={isOpenBalance}  onClose={() => setIsOpenBalance(false)} />
        </div>
        <div className={styles.expense}>
          <h1>{`Expense: ₹${expense}`}</h1>
          <button onClick={() => setIsOpenExpense(true)}>+ Add Expense</button>
          <ExpenseWindow
            isOpen={isOpenExpense}
            name={"Add Expense"}
            onClose={() => setIsOpenExpense(false)}
            
          />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <Chart />
      </div>
    </React.Fragment>
  );
};

export default Card;
