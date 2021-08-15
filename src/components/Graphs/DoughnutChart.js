import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { fire, db } from "../../util/firebase";
// This Chart will show monthly expenses and Total Money

const DoughnutChart = () => {
  const [expenseCategories, setExpenseCategories] = useState([]);

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  let todayConvert;
  if (today.getMonth() + 1 <= 9) {
    todayConvert =
      today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)) + "-" + "01";
  } else {
    todayConvert =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + "01";
  }

  let lastDayConvert;
  if (lastDayOfMonth.getMonth() + 1 <= 9) {
    lastDayConvert =
      lastDayOfMonth.getFullYear() +
      "-" +
      ("0" + (lastDayOfMonth.getMonth() + 1)) +
      "-" +
      lastDayOfMonth.getDate();
  } else {
    lastDayConvert =
      lastDayOfMonth.getFullYear() +
      "-" +
      (lastDayOfMonth.getMonth() + 1) +
      "-" +
      lastDayOfMonth.getDate();
  }

  const ref = db.collection("expenses");


  function getCategoriesData() {
    const items = [];

    const categoryQuery = ref
      .where("author", "==", fire.auth().currentUser.uid)
      .where("date", ">=", todayConvert)
      .where("date", "<=", lastDayConvert);

      categoryQuery.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const categoryInfo = {
            date: data.date,
            cost: data.cost,
            category: data.category
          }
          items.push(categoryInfo);
          setExpenseCategories(items);
        })
        console.log(items)
      })
  }


  function filterCategory(category){
    let cost = 0;
    for(let i =0; i <expenseCategories.length; i++){
      if (expenseCategories[i].category == category){
          cost += expenseCategories[i].cost
          return cost
        }
      }
  }



  useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <div className="doughnutChart">
      <h4>Current Month's Expense Breakdown</h4>
      <Doughnut
        data={{
          labels: ["Entertainment", "Rent", "Food", "Misc.", "Investment", "Insurance", "Health"],
          datasets: [
            {
              label: "Expense Breakdown",
              data: [filterCategory('entertainment'),filterCategory('rent'),filterCategory('food'),filterCategory('misc'),filterCategory('investments'),filterCategory('insurance'),filterCategory('health')],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 110, 235)",
                "rgb(215, 125, 26)",
                "rgb(85, 155, 86)",
                "rgb(255, 5, 86)",
                "rgb(250, 205, 86)",
                "rgb(195, 205, 86)"
              ],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
};

export default DoughnutChart;
