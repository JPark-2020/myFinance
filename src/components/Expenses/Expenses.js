import { db, fire } from "../../util/firebase";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const ref = db.collection("expenses");

  function getExpenses() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
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
    ref.doc(newExpense.id).set(newExpense).catch((err) => {
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
    addExpense({
      name: expenseName,
      cost: expenseCost,
      date: expenseDate,
      id: uuidv4(),
      author: fire.auth().currentUser.uid,
    });
  };



  return (
    <div>
      <h1>Expenses</h1>
      <div>
        <h3>Add New Expense</h3>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          value={expenseCost}
          onChange={(e) => setExpenseCost(e.target.value)}
        />
        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />
        <button onClick={expenseSubmitHandler}>Add Expense</button>
      </div>
      <hr />
      {loading ? <h1>Loading....</h1> : null}
      {expenses.map((expense) => (
        <div key={expense.id}>
          <div>
            <h3>{expense.name}</h3>
            <p>${expense.cost}</p>
            <p>{expense.date}</p>
          </div>
          <div>
            <button onClick={() => deleteExpense(expense)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Expenses;