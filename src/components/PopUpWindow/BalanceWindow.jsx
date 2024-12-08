import React, {
  useContext,
  useState,
} from 'react';

import { useSnackbar } from 'notistack';
import ReactModal from 'react-modal';

import { ExpenseContext } from '../Context/ExpenseProvider';
import styles from './BalanceWindow.module.css';

const BalanceWindow = ({isOpenBalance , onClose }) => {
    const [money, setMoney]=useState();
    const {setBalance}=useContext(ExpenseContext);
    const {enqueueSnackbar} =useSnackbar();
    const handleMoney=()=>{
        const value = Number(money);
        if (isNaN(value) || value <= 0) {
            enqueueSnackbar('Please enter a valid amount to add.', { variant: 'error' });
            return;
          }
          const currentBalance=Number(localStorage.getItem("balance"))||0;
          const updateBalance=currentBalance+value;
          localStorage.setItem("balance",updateBalance);
          setBalance(updateBalance);
          setMoney("");
          onClose();
          enqueueSnackbar('Balance added successfully!', { variant: 'success' });
    }
  return (
    <ReactModal isOpen={isOpenBalance} onRequestClose={onClose}>
<div className={styles.modal}>
        <h1>Add Balance</h1>
        <div className={styles.innerModal}>
        <input type="text" name="addBalance" id="addBalance"  placeholder='Income Account' value={money} onChange={(e)=>setMoney(e.target.value)}/>
        <button onClick={handleMoney}>Add Balance</button>
        <button onClick={onClose}>Cancel</button>
        </div>
        </div>
    </ReactModal>
  )
}

export default BalanceWindow