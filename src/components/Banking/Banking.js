import React, { useState, useRef } from 'react';

const Banking = () => {

    const [balance, setBalance] = useState(0);
    const depositRef = useRef();

    const depositHandler = event => {
        event.preventDefault();
        console.log(depositRef.current.value);  
        setBalance(balance + parseInt(depositRef.current.value));
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
                    <button type="submit" onClick={depositHandler}>Add Funds</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Banking; 