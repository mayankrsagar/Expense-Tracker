import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { useSnackbar } from 'notistack';
import ReactModal from 'react-modal';

import { ExpenseContext } from '../Context/ExpenseProvider';
import styles from './ExpenseWindow.module.css';

const ExpenseWindow = ({ isOpen, onClose, name }) => {
  const category = ["food", "entertainment", "travel"];
  const [form, setForm] = useState({
    title: "",
    price: "",
    date: "",
    formattedDate: "",
    category: "",
  });
  const [oldPrice, setOldPrice] = useState(0);
  const {
    setExpensesList,
    setBalance,
    setExpense,
    listId,
    setListId,
    expensesList,
  } = useContext(ExpenseContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (listId) {
      const selectedExpense = expensesList.find((ele) => ele.id === listId);
      if (selectedExpense) {
        setForm(selectedExpense);
        setOldPrice(selectedExpense.price);
      }
    } else {
      setForm({ title: "", price: "", date: "", formattedDate: "", category: "" });
    }
  }, [listId, expensesList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const formattedDate = new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setForm((prev) => ({ ...prev, formattedDate }));
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.date || !form.category) {
      enqueueSnackbar("All fields are required.", { variant: "error" });
      return;
    }

    const currentBalance = Number(localStorage.getItem("balance")) || 0;

    if (listId) {
      const updatedExpenses = expensesList.map((ele) =>
        ele.id === listId ? { ...form, id: ele.id } : ele
      );
      const updatedBalance =
        currentBalance + Number(oldPrice || 0) - Number(form.price);
      const updatedTotalExpense = updatedExpenses.reduce(
        (total, ele) => total + Number(ele.price),
        0
      );

      setExpensesList(updatedExpenses);
      setBalance(updatedBalance);
      setExpense(updatedTotalExpense);

      localStorage.setItem("expensesList", JSON.stringify(updatedExpenses));
      localStorage.setItem("balance", updatedBalance);
      localStorage.setItem("expense", updatedTotalExpense);
      setForm({ title: "", price: "", date: "", formattedDate: "", category: "" });
      setListId(null);
      enqueueSnackbar("Expense updated successfully!", { variant: "success" });
    } else {
      const newExpense = { ...form, id: Date.now() };
      const updatedExpenses = [...expensesList, newExpense];

      if (Number(form.price) > currentBalance) {
        enqueueSnackbar("Insufficient balance!", { variant: "error" });
        return;
      }

      const updatedTotalExpense = updatedExpenses.reduce(
        (total, ele) => total + Number(ele.price),
        0
      );

      setExpensesList(updatedExpenses);
      setBalance(currentBalance - Number(form.price));
      setExpense(updatedTotalExpense);

      localStorage.setItem("expensesList", JSON.stringify(updatedExpenses));
      localStorage.setItem("balance", currentBalance - Number(form.price));
      localStorage.setItem("expense", updatedTotalExpense);

      enqueueSnackbar("Expense added successfully!", { variant: "success" });
    }

    setListId(null);
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
        setListId(null);
      }}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.formBody}>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className={styles.input}
          />
          <input
            type="number"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className={styles.input}
          />
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="" disabled>
              Select Category
            </option>
            {category.map((ele) => (
              <option value={ele} key={ele}>
                {ele}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            id="date"
            value={form.date}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.actions}>
          {listId ? (
            <button type="submit" className={styles.button}>
              Edit Expense
            </button>
          ) : (
            <button type="submit" className={styles.button}>
              Add Expense
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onClose();
              setListId(null);
            }}
            className={styles.button}
          >
            Cancel
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export default ExpenseWindow;