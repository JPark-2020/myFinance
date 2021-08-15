import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { fire, db } from "../../util/firebase";

// Chart shows breakdown of monthly expenses
// Chart only seems to show one expense until you press sidenav - need to resolve

const DoughnutChart = () => {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [entertainment, setEntertainment] = useState(0);
  const [rent, setRent] = useState(0);
  const [food, setFood] = useState(0);
  const [misc, setMisc] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [health, setHealth] = useState();

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

  function getCategoriesData(category) {
    const items = [];

    const categoryQuery = ref
      .where("author", "==", fire.auth().currentUser.uid)
      .where("date", ">=", todayConvert)
      .where("date", "<=", lastDayConvert)
      .where("category", "==", category);

    categoryQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const catItem = data.cost;
        items.push(catItem);

        const cost = items.reduce((a, b) => a + b, 0);

        if (category === "entertainment") {
          setEntertainment(cost);
        } else if (category === "rent") {
          setRent(cost);
        } else if (category === "food") {
          setFood(cost);
        } else if (category === "misc") {
          setMisc(cost);
        } else if (category === "investments") {
          setInvestments(cost);
        } else if (category === "insurance") {
          setInsurance(cost);
        } else if (category === "health") {
          setHealth(cost);
        }
      });
    });
  }

  function assignCatData(category) {
    if (category === "entertainment") {
      return entertainment;
    } else if (category === "rent") {
      return rent;
    } else if (category === "food") {
      return food;
    } else if (category === "misc") {
      return misc;
    } else if (category === "investments") {
      return investments;
    } else if (category === "insurance") {
      return insurance;
    } else if (category === "health") {
      return health;
    }
  }

  useEffect(() => {
    getCategoriesData('entertainment');
    getCategoriesData('rent');
    getCategoriesData('food');
    getCategoriesData('misc');
    getCategoriesData('investments');
    getCategoriesData('insurance');
    getCategoriesData('health');
  }, []);

  return (
    <div className="doughnutChart">
      <h4>Current Month's Expense Breakdown</h4>
      <Doughnut
        data={{
          labels: [
            "Entertainment",
            "Rent",
            "Food",
            "Misc",
            "Investment",
            "Insurance",
            "Health",
          ],
          datasets: [
            {
              label: "Expense Breakdown",
              data: [
                assignCatData("entertainment"),
                assignCatData("rent"),
                assignCatData("food"),
                assignCatData("misc"),
                assignCatData("investments"),
                assignCatData("insurance"),
                assignCatData("health"),
              ],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 110, 235)",
                "rgb(215, 125, 26)",
                "rgb(85, 155, 86)",
                "rgb(255, 5, 86)",
                "rgb(250, 205, 86)",
                "rgb(195, 205, 86)",
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
