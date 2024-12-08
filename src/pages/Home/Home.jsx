import React, { useEffect } from 'react';

import Card from '../../components/Card/Card';
import MyBarChart from '../../components/Chart/MyBarChart';
import RecentTransaction
  from '../../components/RecentTransaction/RecentTransaction';
import styles from './Home.module.css';

const Home = () => {

    useEffect(() => {
      // Check if balance and expense are already set in localStorage
      if (!localStorage.getItem("balance")) { // Check for existing data
        localStorage.setItem("balance", 5000); 
      }
  
      if (!localStorage.getItem("expense")) { // Check for existing data
        localStorage.setItem("expense", 0); 
      }
    }, []);
   
    
  return (
    <React.Fragment>
      <div className={styles.container}>
      <h1 className={styles.title}>Expense Tracker</h1> 
      <div>
        <div className={styles.mainContainer}>
            <div className={styles.header}>
              <Card />
            </div>
            <div className={styles.body}>
            <div className={styles.transaction}>
            <h1 style={{color:"white"}}>Recent Transaction</h1>
            <RecentTransaction />
            </div>
            <div className={styles.topExpense}>
            <h1 style={{color:"white"}}>Top Expense</h1>
            <MyBarChart />
            </div>
            </div>
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
