import React, { useState, useEffect } from 'react';
import {fire, db} from '../../util/firebase';


const Banking = () => {

    const [balance, setBalance] = useState();
    const [bankingItems, setBankingItems] = useState();
    const [withdraw, setWithdraw] = useState();
    const [deposit, setDeposit] = useState()
    const [loading, setLoading] = useState(false);

    const ref = db.collection("userbalance");


    function getUserBalance() {
        setLoading(true);
        const userBalance = ref.get().where('user', '==', fire.auth().currentUser.uid)
        setBalance(userBalance);
        setLoading(false);
    }

    function getBankingHistory() {
        setLoading(true);
        ref.orderBy("date", "desc").onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) =>{
                items.push(doc.data())
            });
            setBankingItems(items);
            setLoading(false);
        })
    }

    useEffect(() => {
        getUserBalance();
        getBankingHistory();
    }, []);

    function addBalance(targetBalance){
          
    }




    return (
        <React.Fragment>
            <div>
                <h3>Banking</h3>
                <h3>Current Balance: {balance}</h3>
            </div>

            <div>
                <h3>Deposit Funds</h3>
                <form>
                    <input type="number" />
                    <label>Amount</label>
                    <button type="submit">Deposit Funds</button>
                </form>
            </div>
            <div>
                <h3>Withdraw Funds</h3>
                <form>
                    <input type="number"/>
                    <label>Amount</label>
                    <button type="submit" >Withdraw Funds</button>
                </form>
            </div>
            <hr />
            <br/>
            <div>
                <h4>History</h4>
            </div>
        </React.Fragment>
    )
}

export default Banking; 