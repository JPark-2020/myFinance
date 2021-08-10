import React, { useState, useRef } from 'react';

const Banking = () => {

    const [balance, setBalance] = useState(0);
    const [withdraw, setWithdraw] = useState();
    const [deposit, setDeposit] = useState()
    const depositRef = useRef();
    const withdrawalRef = useRef();

    const depositHandler = event => {
        event.preventDefault();
        setBalance(balance + parseInt(depositRef.current.value));
    }

    const withdrawalHandler = event => {
        event.preventDefault();
        setBalance(balance - parseInt(withdrawalRef.current.value));
        setWithdraw('');
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
                    <input type="number" ref={depositRef}/>
                    <label>Amount</label>
                    <button type="submit" onClick={depositHandler}>Deposit Funds</button>
                </form>
            </div>
            <div>
                <h3>Withdraw Funds</h3>
                <form>
                    <input type="number" ref={withdrawalRef}/>
                    <label>Amount</label>
                    <button type="submit" onClick={withdrawalHandler}>Withdraw Funds</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Banking; 