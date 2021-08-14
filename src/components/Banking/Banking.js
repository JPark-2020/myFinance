import React, { useState, useEffect } from "react";
import { fire, db } from "../../util/firebase";
import { v4 as uuidv4 } from "uuid";

const Banking = () => {
  const [balance, setBalance] = useState();
  const [bankingItems, setBankingItems] = useState();
  const [withdraw, setWithdraw] = useState();
  const [deposit, setDeposit] = useState();
  const [loading, setLoading] = useState(false);

  const ref = db.collection("userbalance");
  

  function getUserBalance() {
      const test = 0; 
    setLoading(true);
    const userBalance = ref
      .where("id", "==", fire.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const balanceNumber = data.balance;
          setBalance(balanceNumber);
          console.log(balanceNumber)
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

  function addBalance(updateBalance) {
   ref.doc(updateBalance.id).set(updateBalance).catch((err) => {
       console.log(err)
   })
  }

  const addBalanceHandler = (event) => {
    event.preventDefault();

    
    const additionalBalance = balance ? (parseInt(balance) + parseInt(deposit)) : (parseInt(deposit));
    addBalance({
      balance: additionalBalance,
      id: fire.auth().currentUser.uid
    })
    setBalance(additionalBalance);
  };

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
        <form>
          <input type="number" />
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
