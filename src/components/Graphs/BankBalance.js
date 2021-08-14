import React, { useState, useEffect} from 'react';
import {db} from '../../util/firebase';

const BankBalance = () => {

    const [balance, setBalance] = useState();
    
    return (
        <div>
            <h3>BANK ACCOUNTS</h3>
            <div>
                <h4>Bank Account 1</h4>
                <p>Checkings<span>$1000</span></p>
                <p>Savings<span>$100</span></p>
            </div>
            <hr/>
            <div>
                <h4>Bank Account 2</h4>
                <p>Checkings<span>$2000</span></p>
                <p>Savings<span>$150</span></p>
            </div>
        </div>
    )
}

export default BankBalance; 