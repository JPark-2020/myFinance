import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fire, db } from "../../util/firebase";

const BarChart = () => {
  const [depositsInfo, setDepositsInfo] = useState([]);
  const [withdrawalsInfo, setWithdrawalsInfo] = useState([]);
  const [day1, setDay1] = useState();
  const [day2, setDay2] = useState();
  const [day3, setDay3] = useState();
  const [day4, setDay4] = useState();
  const [day5, setDay5] = useState();
  const [day6, setDay6] = useState();
  const [day7, setDay7] = useState();
  const ref = db.collection("transactions");

  function dateChange(day) {
    let curr = new Date();
    let week = [];

    for (let i = 0; i <= 6; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    return week[day];
  }

  function getDeposits(day) {
    const depositQuery = ref
      .where("user", "==", fire.auth().currentUser.uid)
      .where("deposit", "==", true)
      .where("date", "==", day);

    const items = [];
    depositQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data)
        const depositInfo = data.amount;
        items.push(depositInfo);

        console.log(items)
        const dayTotal = items.reduce((a, b) => a + b, 0);
        console.log(dayTotal);
        if (day === dateChange(0)) {
          setDay1(dayTotal);
        } else if (day === dateChange(1)) {
          setDay2(dayTotal);
        } else if (day === dateChange(2)) {
          setDay3(dayTotal);
        } else if (day === dateChange(3)) {
          setDay4(dayTotal);
        } else if (day === dateChange(4)) {
          setDay5(dayTotal);
        } else if (day === dateChange(5)) {
          setDay6(dayTotal);
        } else if (day === dateChange(6)) {
          setDay7(dayTotal);
        }
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
  // getWithdrawals();
  useEffect(() => {
    getDeposits(dateChange(0));
    getDeposits(dateChange(1));
    getDeposits(dateChange(2));
    getDeposits(dateChange(3));
    getDeposits(dateChange(4));
    getDeposits(dateChange(5));
    getDeposits(dateChange(6));
  }, []);

  function assignWithdrawals(day) {
    let amount = 0;
    for (let i = 0; i < withdrawalsInfo.length; i++) {
      if (withdrawalsInfo[i].date == day) {
        amount = amount + withdrawalsInfo[i].amount;
      }
    }
  }

  function assignDeposits(day) {
    if(day === 0){
      return day1
    } else if (day === 1 ){
      return  day2
    } else if (day === 2 ){
      return day3
    } else if (day === 3){
      return day4
    } else if(day === 4){
      return day5
    } else if (day === 5){
      return day6
    } else if (day === 6){
      return day7
    }
  }


  return (
    <div className="barChart">
      <h4 className="chart__header">Current Week's Deposits/Withdrawals</h4>
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
                assignDeposits(0),
                assignDeposits(1),
                assignDeposits(2),
                assignDeposits(3),
                assignDeposits(4),
                assignDeposits(5),
                assignDeposits(6)
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
        width={400}
        height={400}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  );
};

export default BarChart;
