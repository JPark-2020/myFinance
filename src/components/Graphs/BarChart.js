import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fire, db } from "../../util/firebase";

const BarChart = () => {
  const [depositsInfo, setDepositsInfo] = useState([]);
  const [withdrawalsInfo, setWithdrawalsInfo] = useState([]);
  const ref = db.collection("transactions");

  function dateChange(day) {
    let curr = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    return week[day];
  }

  function getDeposits() {
    const depositQuery = ref
      .where("user", "==", fire.auth().currentUser.uid)
      .where("deposit", "==", true);
    const items = [];
    depositQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const depositInfo = {
          date: data.date,
          amount: data.amount,
        };
        items.push(depositInfo);
        setDepositsInfo(items);
      });
    });
  }

  function getWithdrawals() {
    const withdrawalQuery = ref
      .where("user", "==", fire.auth().currentUser.uid)
      .where("deposit", "!=", true);
    const items = [];
    withdrawalQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const withdrawalInfo = {
          date: data.date,
          amount: data.amount,
        };
        items.push(withdrawalInfo);
        setWithdrawalsInfo(items);
      });
    });
  }

  useEffect(() => {
    getDeposits();
    getWithdrawals();
  }, []);

  function assignWithdrawals(day) {
    let amount = 0;
    for (let i = 0; i < withdrawalsInfo.length; i++) {
      if (withdrawalsInfo[i].date == day) {
        amount = parseInt(amount) + parseInt(withdrawalsInfo[i].amount);
        return amount;
      }
    }
  }

  function assignDeposits(day) {
    let amount = 0;
    for (let i = 0; i < depositsInfo.length; i++) {
      if (depositsInfo[i].date == day) {
        amount = parseInt(amount) + parseInt(depositsInfo[i].amount);
        return amount;
      }
    }
  }

  return (
    <div className="barChart">
      <h4>Weekly Deposits/Withdrawals</h4>
      <Bar
        data={{
          labels: [
            dateChange(0),
            dateChange(1),
            dateChange(2),
            dateChange(3),
            dateChange(4),
            dateChange(5),
            dateChange(6),
          ],
          datasets: [
            {
              label: "Deposit",
              data: [
                assignDeposits(dateChange(0)),
                assignDeposits(dateChange(1)),
                assignDeposits(dateChange(2)),
                assignDeposits(dateChange(3)),
                assignDeposits(dateChange(4)),
                assignDeposits(dateChange(5)),
                assignDeposits(dateChange(6)),
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
            {
              label: "Withdrawal",
              data: [
                assignWithdrawals(dateChange(0)),
                assignWithdrawals(dateChange(1)),
                assignWithdrawals(dateChange(2)),
                assignWithdrawals(dateChange(3)),
                assignWithdrawals(dateChange(4)),
                assignWithdrawals(dateChange(5)),
                assignWithdrawals(dateChange(6)),
                assignWithdrawals(dateChange(7)),
              ],
              backgroundColor: "orange",
              borderColor: "red",
              borderWidth: 2,
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
