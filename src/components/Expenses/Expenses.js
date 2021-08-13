import { db, fire } from "../../util/firebase";
import React, { useState, useEffect, useRef } from "react";
const Expenses = () => {
  const [expenseItems, setExpenseItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const expenseName = useRef();
  const expenseCost = useRef();
  const expenseDate = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = {
      name: expenseName.current.value,
      cost: expenseCost.current.value,
      dueDate: expenseDate.current.value,
      author: fire.auth().currentUser.uid,
    };

    db.collection("Expenses").add(formData);
  };

  useEffect(() => {
    const getExpenses = [];
    const subscriber = db.collection("Expenses").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getExpenses.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setExpenseItems(getExpenses);
      setLoading(false);
    });
    return () => subscriber();
  }, [loading]);

  return (
    <div>
      <h4>Expenses</h4>
      <div className="expenseForm">
        <form onSubmit={submitHandler}>
          <label id="expenseName">Item Name</label>
          <input htmlFor="expenseName" type="text" ref={expenseName} />
          <label id="expenseCost">Item Cost</label>
          <input
            htmlFor="expenseCost"
            step="0.01"
            type="Number"
            ref={expenseCost}
          />
          <label id="expenseDate">Date Due</label>
          <input htmlFor="expenseDate" type="date" ref={expenseDate} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="expenseItems">
        {expenseItems.map((expense) => (
          <div key={expense.key}>
            <h5>{expense.name}</h5>
            <p>{expense.cost}</p>
            <p>{expense.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;
