import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fire, db } from "../../util/firebase";

// This will show monthly expense amount 

const LineChart = () => {
  const [janExpenses, setJanExpenses] = useState(0);
  const [febExpenses, setFebExpenses] = useState(0);
  const [marExpenses, setMarExpenses] = useState(0);
  const [aprExpenses, setAprExpenses] = useState(0);
  const [mayExpenses, setMayExpenses] = useState(0);
  const [junExpenses, setJunExpenses] = useState(0);
  const [julExpenses, setJulExpenses] = useState(0);
  const [augExpenses, setAugExpenses] = useState(0);
  const [sepExpenses, setSepExpenses] = useState(0);
  const [octExpenses, setOctExpenses] = useState(0);
  const [novExpenses, setNovExpenses] = useState(0);
  const [decExpenses, setDecExpenses] = useState(0);

  const ref = db.collection("expenses");

  function getMonthEnd(y, m) {
    let day = new Date(y, m + 1, 0).getDate();
    let month = m + 1;
    let date = y;
    return `${date}-${month}-${day}`;
  }

  const janStart = "2021-01-01";
  const janEnd = "2021-01-31";
  const febStart = "2021-02-01";
  const febEnd = "2021-02-31";
  const marStart = "2021-03-01";
  const marEnd = "2021-03-31";
  const aprStart = "2021-04-01";
  const aprEnd = "2021-04-31";
  const mayStart = "2021-05-01";
  const mayEnd = "2021-05-31";
  const junStart = "2021-06-01";
  const junEnd = "2021-06-31";
  const julStart = "2021-07-01";
  const julEnd = "2021-07-31";
  const augStart = "2021-08-01";
  const augEnd = "2021-08-31";
  const sepStart = "2021-09-01";
  const sepEnd = "2021-09-31";
  const octStart = "2021-10-01";
  const octEnd = "2021-10-31";
  const novStart = "2021-11-01";
  const novEnd = "2021-11-31";
  const decStart = "2021-12-01";
  const decEnd = "2021-12-31";

  function getExpenses(monthStart, monthEnd) {
    const monthExpenseQuery = ref
      .where("author", "==", fire.auth().currentUser.uid)
      .where("date", ">=", monthStart)
      .where("date", "<=", monthEnd);

    const monthExpenses = [];
    monthExpenseQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const expense = parseInt(data.cost);
        monthExpenses.push(expense);

        const expenseTotal = monthExpenses.reduce((a, b) => a + b, 0);
        if (monthStart === "2021-01-01") {
          setJanExpenses(expenseTotal);
        } else if (monthStart === "2021-02-01") {
          setFebExpenses(expenseTotal);
        } else if (monthStart === "2021-03-01") {
          setMarExpenses(expenseTotal);
        } else if (monthStart === "2021-04-01") {
          setAprExpenses(expenseTotal);
        } else if (monthStart === "2021-05-01") {
          setMayExpenses(expenseTotal);
        } else if (monthStart === "2021-06-01") {
          setJunExpenses(expenseTotal);
        } else if (monthStart === "2021-07-01") {
          setJulExpenses(expenseTotal);
        } else if (monthStart === "2021-08-01") {
          setAugExpenses(expenseTotal);
        } else if (monthStart === "2021-09-01") {
          setSepExpenses(expenseTotal);
        } else if (monthStart === "2021-10-01") {
          setOctExpenses(expenseTotal);
        } else if (monthStart === "2021-11-01") {
          setNovExpenses(expenseTotal);
        } else if (monthStart === "2021-12-01") {
          setDecExpenses(expenseTotal);
        }
      });
    });
  }

  function assignMonthExpenses(month) {
    if (month === "jan") {
      return janExpenses;
    } else if (month === "feb") {
      return febExpenses;
    } else if (month === "mar") {
      return marExpenses;
    } else if (month === "apr") {
      return aprExpenses;
    } else if (month === "may") {
      return mayExpenses;
    } else if (month === "jun") {
      return junExpenses;
    } else if (month === "jul") {
      return julExpenses;
    } else if (month === "aug") {
      return augExpenses;
    } else if (month === "sep") {
      return sepExpenses;
    } else if (month === "oct") {
      return octExpenses;
    } else if (month === "nov") {
      return novExpenses;
    } else if (month === "dec") {
      return decExpenses;
    }
  }

  useEffect(() => {
    getExpenses(janStart, janEnd);
    getExpenses(febStart, febEnd);
    getExpenses(marStart,marEnd);
    getExpenses(aprStart, aprEnd);
    getExpenses(mayStart,mayEnd);
    getExpenses(junStart, junEnd);
    getExpenses(julStart,julEnd);
    getExpenses(augStart, augEnd);
    getExpenses(sepStart,sepEnd);
    getExpenses(octStart, octEnd);
    getExpenses(novStart, novEnd);
    getExpenses(decStart, decEnd);
  }, []);

  return (
    <div>
      <h4>Monthly Expenses</h4>
      <Line
        data={{
          labels: [
            "jan",
            "feb",
            "march",
            "apr",
            "may",
            "jun",
            "jul",
            "aug",
            "sep",
            "oct",
            "nov",
            "dec",
          ],
          datasets: [
            {
              label: "My First Dataset",
              data: [
                assignMonthExpenses("jan"),
                assignMonthExpenses("feb"),
                assignMonthExpenses("mar"),
                assignMonthExpenses("apr"),
                assignMonthExpenses("may"),
                assignMonthExpenses("jun"),
                assignMonthExpenses("jul"),
                assignMonthExpenses("aug"),
                assignMonthExpenses("sep"),
                assignMonthExpenses("oct"),
                assignMonthExpenses("nov"),
                assignMonthExpenses("dec"),
              ],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
