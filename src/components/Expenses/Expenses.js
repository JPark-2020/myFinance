 import { db, fire } from "../../util/firebase";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [category, setCategory] = useState("");

  const ref = db.collection("expenses");

  function getExpenses() {
    setLoading(true);
    ref.where("author", "==", fire.auth().currentUser.uid).orderBy("date", "desc").onSnapshot((querySnapshot) => {
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
      category: category, 
      id: uuidv4(),
      author: fire.auth().currentUser.uid,
    });
    setExpenseName('');
    setExpenseCost('');
    setExpenseDate('');
  };



  return (
    <div>
      <h1>Expenses</h1>
      <div>
        <h3>Add New Expense</h3>
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
        <select id="categories" onChange={(e) => setCategory(e.target.value)} required>
          <option value="entertainment">Entertainment</option>
          <option value="rent">Rent</option>
          <option value="investments">Investments</option>
          <option value="food">Food</option>
          <option value="insurance">Insurance</option>
          <option value="health">Health</option>
          <option value="misc">Misc.</option>
        </select>

        
        <button onClick={expenseSubmitHandler}>Add Expense</button>
      </div>
      <hr />
      
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