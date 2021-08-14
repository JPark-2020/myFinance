import React, { useState, useEffect } from "react";
import { fire, db } from "../../util/firebase";

const Banking = () => {
  const [balance, setBalance] = useState();
  const [bankingItems, setBankingItems] = useState();
  const [withdraw, setWithdraw] = useState();
  const [deposit, setDeposit] = useState();
  const [loading, setLoading] = useState(false);

  const ref = db.collection("userbalance");

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
    ref.orderBy("date", "desc").onSnapshot((querySnapshot) => {
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

  //   function updateBalance(balanceData) {
  //     ref
  //       .doc(updateBalance.id)
  //       .set({
  //           balance: balanceData.balance,
  //           id: balanceData.id
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  //   const addBalanceHandler = (event) => {
  //     event.preventDefault();

  //     const additionalBalance = balance
  //       ? parseInt(balance) + parseInt(deposit)
  //       : parseInt(deposit);
  //     updateBalance({
  //       balance: additionalBalance,
  //       id: fire.auth().currentUser.uid,
  //     });
  //     setBalance(additionalBalance);
  //   };

  //   const withdrawBalanceHandler = (event) => {
  //     event.preventDefault();
  //     const removeBalance = parseInt(balance) - parseInt(withdraw);
  //     updateBalance({
  //       balance: removeBalance,
  //       id: fire.auth().currentUser.uid,
  //     });
  //     setBalance(removeBalance);
  //   };

  function changeBalance(updateBalance) {
    ref
      .doc(updateBalance.id)
      .set(updateBalance)
      .catch((err) => {
        console.log(err);
      });
  }

  const addBalanceHandler = (event) => {
    event.preventDefault();

    const additionalBalance = balance
      ? parseInt(balance) + parseInt(deposit)
      : parseInt(deposit);
    changeBalance({
      balance: additionalBalance,
      id: fire.auth().currentUser.uid,
    });
    setBalance(additionalBalance);
  };

  const withdrawBalanceHandler = (event) => {
      event.preventDefault();

      const newBalance = parseInt(balance) - parseInt(withdraw);
      changeBalance({
          balance: newBalance,
          id: fire.auth().currentUser.uid
      })
      setBalance(newBalance);
  }

  return (
    <React.Fragment>
      <div>
        <h3>Banking</h3>
        <h4>Current Balance: {balance}</h4>
      </div>

      <div>
        <h3>Deposit Funds</h3>
        <form onSubmit={addBalanceHandler}>
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
          <label>Amount</label>
          <button type="submit">Deposit Funds</button>
        </form>
      </div>
      <div>
        <h3>Withdraw Funds</h3>
        <form onSubmit={withdrawBalanceHandler}>
          <input
            type="number"
            value={withdraw}
            max={balance}
            onChange={(e) => setWithdraw(e.target.value)}
          />
          <label>Amount</label>
          <button type="submit">Withdraw Funds</button>
        </form>
      </div>
      <hr />
      <br />
      <div>
        <h4>History</h4>
      </div>
    </React.Fragment>
  );
};

export default Banking;
