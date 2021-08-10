const Expenses = () => {
  const expenseItems = [
    {
      name: "toiletpaper",
      cost: 29.99,
      duedate: "3-3-21",
    },
    {
      name: "Netflix",
      cost: 15,
      duedate: "3-30-21",
    },
  ];

  return (
    <div>
      <h4>Expenses</h4>
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
        {expenseItems.map((expense) => (
          <div>
            <h5>{expense.name}</h5>
            <p>{expense.cost}</p>
            <p>{expense.duedate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;
