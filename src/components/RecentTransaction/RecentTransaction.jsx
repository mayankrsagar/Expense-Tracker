import React, {
  useContext,
  useState,
} from 'react';

import { BsFillSuitcaseLgFill } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import {
  GrFormNextLink,
  GrFormPreviousLink,
} from 'react-icons/gr';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import {
  IoGiftOutline,
  IoPizzaOutline,
} from 'react-icons/io5';

import { ExpenseContext } from '../Context/ExpenseProvider';
import ExpenseWindow from '../PopUpWindow/ExpenseWindow';
import styles from './RecentTransaction.module.css';

const RecentTransaction = () => {
  const { expensesList, setExpensesList, setBalance, setExpense, balance, expense, setListId } = useContext(ExpenseContext);
  const [isOpen, setOpen] = useState(false);
  const iconMap = {
    food: <IoPizzaOutline />,
    entertainment: <IoGiftOutline />,
    travel: <BsFillSuitcaseLgFill />,
  };

  const deleteExpense = (id) => {
    const expenseToDelete = expensesList.find((ele) => ele.id === id);
    if (expenseToDelete) {
      const { price } = expenseToDelete;
      setBalance((prev) => prev + Number(price));
      setExpense((prev) => prev - Number(price));
    }
    const updatedExpenses = expensesList.filter((ele) => ele.id !== id);
    setExpensesList(updatedExpenses);
    localStorage.setItem('expensesList', JSON.stringify(updatedExpenses));
    localStorage.setItem('balance', balance + Number(expenseToDelete?.price || 0));
    localStorage.setItem('expense', expense - Number(expenseToDelete?.price || 0));
  };

  const editExpense = (id) => {
    setOpen(true);
    setListId(id);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = expensesList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(expensesList.length / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.transactionBody}>
      {expensesList.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        currentPageData.map((ele) => (
          
          <div key={ele.id} className={styles.transactionCard}>
            <div className={styles.iconWrapper}>
              {iconMap[ele.category]}
            </div>
            <div className={styles.transactionDetails}>
              <h5>{ele.title}</h5>
              <p>{ele.formattedDate}</p>
            </div>
            <div className={styles.transactionActions}>
              <p className={styles.price}>₹{ele.price}</p>
              <button className={styles.deleteButton} onClick={() => deleteExpense(ele.id)}>
                <IoIosCloseCircleOutline />
              </button>
              <button className={styles.editButton} onClick={() => editExpense(ele.id)}>
                <CiEdit />
              </button>
              <ExpenseWindow isOpen={isOpen} onClose={() => setOpen(false)} name={"Edit Expense"} />
                
            </div>
            
          </div>
        ))
      )}
      
      <div className={styles.paginationWrapper}>
        <button
          className={styles.paginationButton}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <GrFormPreviousLink />
        </button>
        <div className={styles.pageNumber}>{currentPage}</div>
        <button
          className={styles.paginationButton}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <GrFormNextLink />
        </button>
      </div>
    </div>
  );
};

export default RecentTransaction;
