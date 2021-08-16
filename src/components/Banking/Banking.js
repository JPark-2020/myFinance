import React, { useState, useEffect } from "react";
import { fire, db } from "../../util/firebase";
import { v4 as uuidv4 } from "uuid";

import "./Banking.css";
// Note if savings is ticked it returns false -> queries have been adjusted to reflect this
// If document's savings property returns false that means it is a savings***

const Banking = () => {
  const [balance, setBalance] = useState(0);
  const [bankingItems, setBankingItems] = useState([]);
  const [withdraw, setWithdraw] = useState();
  const [deposit, setDeposit] = useState();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();
  const [withdrawSavings, setWithdrawSavings] = useState(false);
  const [depositSavings, setDepositSavings] = useState(false);
  const ref = db.collection("userbalance");
  const ref2 = db.collection("transactions");

  function getUserBalance() {
    setLoading(true);
    const userBalance = ref
      .where("id", "==", fire.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const balanceNumber = data.balance;
          setBalance(balanceNumber);
          console.log(balanceNumber);
        });
        setLoading(false);
      });
  }

  function getBankingHistory() {
    setLoading(true);
    ref2
      .where("user", "==", fire.auth().currentUser.uid)
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setBankingItems(items);
        setLoading(false);
      });
  }

  useEffect(() => {
    getUserBalance();
  }, []);

  useEffect(() => {
    getBankingHistory();
  }, []);

  function changeBalance(updateBalance) {
    ref
      .doc(updateBalance.id)
      .set(updateBalance)
      .catch((err) => {
        console.log(err);
      });
  }

  function addTransactions(transaction) {
    ref2
      .doc(transaction.id)
      .set(transaction)
      .catch((err) => {
        console.log(err);
      });
  }

  const addBalanceHandler = (event) => {
    event.preventDefault();
    const numDeposit = parseInt(deposit);

    const additionalBalance = balance
      ? parseInt(balance) + parseInt(deposit)
      : parseInt(deposit);
    // issue with checkbox
    let oppositeSavings = !depositSavings;

    addTransactions({
      amount: numDeposit,
      deposit: true,
      date: date,
      id: uuidv4(),
      savings: oppositeSavings,
      user: fire.auth().currentUser.uid,
    });

    changeBalance({
      balance: additionalBalance,
      id: fire.auth().currentUser.uid,
    });
    setBalance(additionalBalance);
    setDeposit("");
    setDate("");
    setWithdraw("");
  };

  const withdrawBalanceHandler = (event) => {
    event.preventDefault();

    const numWithdraw = parseInt(withdraw);

    const newBalance = parseInt(balance) - parseInt(withdraw);

    let oppositeSavings = !withdrawSavings;
    addTransactions({
      amount: numWithdraw,
      deposit: false,
      date: date,
      id: uuidv4(),
      savings: oppositeSavings,
      user: fire.auth().currentUser.uid,
    });

    changeBalance({
      balance: newBalance,
      id: fire.auth().currentUser.uid,
    });
    setBalance(newBalance);
  };

  const withdrawSavingsHandler = (event) => {
    event.preventDefault();
    setWithdrawSavings(!withdrawSavings);
    console.log(withdrawSavings);
  };

  const depositSavingsHandler = (event) => {
    event.preventDefault();
    setDepositSavings(!depositSavings);
    console.log(depositSavings);
  };

  return (
    <React.Fragment>
      <div className="banking__header">
        <h3>Banking</h3>
        <h4>Current Balance: {balance}</h4>
      </div>

      <div className="banking__body">
        <div className="banking__forms">
          <div className="banking__deposit__container">
            <h3 className="bankform__header">Deposit Funds</h3>
            <form
              className="banking__deposit__form"
              onSubmit={addBalanceHandler}
            >
              <label>Amount</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                required
              />
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <label id="depositSavings">Savings?</label>
              <input
                type="checkbox"
                className="savingsButton"
                value={depositSavings}
                checked={depositSavings}
                onChange={depositSavingsHandler}
                htmlFor="depositSavings"
              />
              <button type="submit">Deposit Funds</button>
            </form>
          </div>
          <div className="banking__withdraw__container">
            <h3 className="bankform__header">Withdraw Funds</h3>
            <form
              className="banking__withdraw__form"
              onSubmit={withdrawBalanceHandler}
            >
              <label>Amount</label>
              <input
                type="number"
                value={withdraw}
                max={balance}
                onChange={(e) => setWithdraw(e.target.value)}
                required
              />
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <label id="withdrawSavings">Savings?</label>
              <input
              className="savingsButton"
                type="checkbox"
                value={withdrawSavings}
                checked={withdrawSavings}
                htmlFor="withdrawSavings"
                onChange={withdrawSavingsHandler}
              />

              <button type="submit">Withdraw Funds</button>
            </form>
          </div>
        </div>

        <div className="banking__history">
          <div className="banking__history__list">
            {bankingItems.map((item) => (
              <div className="banking__item" key={item.id}>
                <h3>{item.date}:</h3>
                {item.deposit ? (
                  <p className="transaction__deposit">+${item.amount}</p>
                ) : (
                  <p className="transaction__withdrawal">-${item.amount}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Banking;
