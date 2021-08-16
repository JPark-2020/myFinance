import { db, fire } from "../../util/firebase";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Expenses.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const ref = db.collection("expenses");

  function getExpenses() {
    setLoading(true);
    ref
      .where("author", "==", fire.auth().currentUser.uid)
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        const expenseItems = [];
        querySnapshot.forEach((doc) => {
          expenseItems.push(doc.data());
        });
        setExpenses(expenseItems);
        setLoading(false);
      });
  }

  useEffect(() => {
    getExpenses();
  }, []);

  function addExpense(newExpense) {
    ref
      .doc(newExpense.id)
      .set(newExpense)
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteExpense(expense) {
    ref
      .doc(expense.id)
      .delete()
      .catch((err) => {
        console.log(err);
      });
  }

  const expenseSubmitHandler = (event) => {
    event.preventDefault();

    let numCost = parseInt(expenseCost);
    addExpense({
      name: expenseName,
      cost: numCost,
      date: expenseDate,
      category: expenseCategory,
      id: uuidv4(),
      author: fire.auth().currentUser.uid,
    });
    setExpenseName("");
    setExpenseCost("");
    setExpenseDate("");
  };

  return (
    <div className="expenses__main">
      <div className="expenses__form">
        <label>Expense Name</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          required
        />
        <label>Expense Amount</label>
        <input
          type="number"
          value={expenseCost}
          onChange={(e) => setExpenseCost(e.target.value)}
          min="0"
          required
        />
        <label>Date Incurred</label>
        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          required
        />
        <label htmlFor="categories">Category</label>
        <select
          id="categories"
          onChange={(e) => {
            e.preventDefault();
            setExpenseCategory(e.target.value);
          }}
          required
        >
          <option value="entertainment">Entertainment</option>
          <option value="rent">Rent</option>
          <option value="investments">Investments</option>
          <option value="food" selected>
            Food
          </option>
          <option value="insurance">Insurance</option>
          <option value="health">Health</option>
          <option value="misc">Misc.</option>
        </select>

        <button onClick={expenseSubmitHandler}>Add Expense</button>
      </div>

      <div className="expenses__items">
        {expenses.map((expense) => (
          <div className="expense__list__item" key={expense.id}>
            <div className="expense__item__info">
              <p className="expense__date">{expense.date}:</p>
              <p className="expense__desc">{expense.name}</p>
              <p className="expense__cost">${expense.cost}</p>
              <p className="expense__remove" onClick={() => deleteExpense(expense)}>X</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Expenses;
