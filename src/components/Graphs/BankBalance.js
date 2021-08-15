import React, { useState, useEffect } from "react";
import { fire, db } from "../../util/firebase";

const BankBalance = () => {
  const [userBalance, setUserBalance] = useState(0);
  const [userSavings, setUserSavings] = useState(0);

  const ref = db.collection("userbalance");
  const ref2 = db.collection("transactions");

  function getBalance() {
    const balanceQuery = ref.where("id", "==", fire.auth().currentUser.uid);
    balanceQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const firebaseBalance = data.balance;
        setUserBalance(firebaseBalance);
      });
    });
  }

  function getSavings() {
    const savingsQuery = ref2
      .where("user", "==", fire.auth().currentUser.uid)
      .where("savings", "==", false);

    const savingsAdd = [];
    const savingsMinus = [];

    savingsQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const savingsItem = {
          deposit: data.deposit,
          savings: data.savings,
          amount: data.amount,
        };
        //   If this item is a deposit and is for savings
        if (savingsItem.deposit === true) {
          savingsAdd.push(savingsItem.amount);
        } else if (savingsItem.deposit === false) {
          savingsMinus.push(savingsItem.amount);
        }
        console.log(savingsAdd);
        console.log(savingsMinus)
        const totalSaved = savingsAdd.reduce((a, b) => a + b, 0);
        const totalMinus = savingsMinus.reduce((a, b) => a + b, 0);
        const netSavings = totalSaved - totalMinus;
        setUserSavings(netSavings);
      });
    });
  }

  useEffect(() => {
    getBalance();
    getSavings();
  }, []);


  return (
    <div>
      <h3>BANK ACCOUNTS</h3>
      <div>
        <h4>Bank Account 1</h4>
        <p>
          Checkings: <span>${userBalance}</span>
        </p>
        <p>
          Savings: <span>${userSavings} </span>
        </p>
      </div>
    </div>
  );
};

export default BankBalance;
