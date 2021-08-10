import { expensesCollection } from "../../util/firebase";
import fire from "../../util/firebase";
import React, { useState } from "react";
const Expenses = () => {
  //   const expenseItems = [
  //     {
  //       name: "toiletpaper",
  //       cost: 29.99,
  //       duedate: "3-3-21",
  //     },
  //     {
  //       name: "Netflix",
  //       cost: 15,
  //       duedate: "3-30-21",
  //     },
  //   ];

  const [expenseItems, setExpenseItems] = useState([]);



  const submitHandler = async(event) => {
      event.preventDefault();
      const newExpense = await expensesCollection.doc("newExpense").set({
          name: 'Los Angeles',
          cost: '29.88',
          duedate: '3-30-21',
          author: fire.auth().currentUser.uid
      })
      setExpenseItems(newExpense);
      console.log(expenseItems);
  }

  return (
    <div>
      <h4 onClick={submitHandler}>Expenses</h4>
      <div className="expenseForm">
        <form>
          <label id="expenseName">Item Name</label>
          <input htmlFor="expenseName" type="text" />
          <label id="expenseCost">Item Cost</label>
          <input htmlFor="expenseCost" type="Number" />
          <label id="expenseDate">Date Due</label>
          <input htmlFor="expenseDate" type="date" />
        </form>
      </div>
      <div className="expenseItem">
        {/* {expenseItems.map((expense) => (
          <div>
            <h5>{expense.name}</h5>
            <p>{expense.cost}</p>
            <p>{expense.duedate}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Expenses;
