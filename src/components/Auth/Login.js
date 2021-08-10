import React, { useState, useEffect } from "react";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginHandler,
    signupHandler,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <div className="login">
        <div className="loginContainer">
            <label>Username</label>
            <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/>
            <p className="errorMsg">{emailError}</p>
            <label>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
                {hasAccount ? (
                    <div>
                        <button onClick={loginHandler}>Sign In</button>
                        <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                    </div>
                ) : (
                    <div>
                        <button onClick={signupHandler}>Sign Up</button>
                        <p>Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
};

export default Login;
