const Expenses = () => {
  const expenseItems = [
    {
      name: "toiletpaper",
      cost: 29.99,
      duedate: "3-3-21",
    },
    {
        name:"Netflix",
        cost: 15,
        duedate: "3-30-21"
    }
  ];

  return (
    <div>
      <h4>Expenses</h4>
      <div className="expenseForm"></div>
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
