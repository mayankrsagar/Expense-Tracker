import React from 'react';

import Card from '../../components/Card/Card';
import MyBarChart from '../../components/Chart/MyBarChart';
import RecentTransaction
  from '../../components/RecentTransaction/RecentTransaction';
import styles from './Home.module.css';

const Home = () => {

  
   
    
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
