import React, { Fragment, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../Auth";
import useInput from "../hooks/useInput";
import { db } from "../base";
import { ref, set, push } from "firebase/database";
import Button from '@mui/material/Button';
import classes from "./Transact.module.css";
import { useHistory } from "react-router";

const Transact = () => {
  const [transactionType, setTransactionType] = useState("");
  const [isTransactionTypeSelected, setIsTransactionTypeSelected] = useState('');
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  let currentBalance = useSelector(
    (state) => state.transactions.currentBalance
  );

  const {
    value: description,
    isValidationPassed: isDescriptionValidationsPassed,
    isInValid: isDescriptionIsInValid,
    Reset: ResetDescription,
    OnChangeHandler: DescriptionChangeHandler,
    OnBlurHandler: DescriptionBlurHandler,
  } = useInput((val) => val !== "");

  const {
    value: amount,
    isValidationPassed: isAmountValidationsPassed,
    isInValid: isAmountIsInValid,
    Reset: ResetAmount,
    OnChangeHandler: AmountChangeHandler,
    OnBlurHandler: AmountBlurHandler,
  } = useInput((val) => val !== "");

  const transactionTypeChangeHandler = (event) => {
    setTransactionType(event.target.value);
    setIsTransactionTypeSelected(event.target.value);
  };

  const ResetTransactionTypeHandler = () => {
    setTransactionType("");
  };

  let isFormValid = isDescriptionValidationsPassed && isAmountValidationsPassed && isTransactionTypeSelected!=='no';

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    } else if (!authCtx?.accNumber) {
      alert("kindly login first");
    }
    else if(event.target.transactionType.value!==''){
      setIsTransactionTypeSelected('');

      const transactionData = {
        accountNumber: authCtx.accNumber,
        transactionType: event.target.transactionType.value,
        description,
        amount,
        date: Date.now(),
      };

      const path = "transactions/" + authCtx.accNumber;
      const accRef = ref(db, path);
      if (accRef !== null) {
        // when transaction exists for this accountNumber
        set(push(ref(db, path)), transactionData);
      } else {
        // when no transaction exist for this accountNumber
        set(ref(db, path), transactionData);
      }
      ResetTransactionTypeHandler();
      ResetDescription();
      ResetAmount();
      history.push('/');
    }
    else 
    {  setIsTransactionTypeSelected('no');
      return;
    }
  };

  return (
    <Fragment>

      {/* <SimplePaper className={classes.SimplePaper}> */}
        <h1 className={classes.h1}>Withdraw/Deposit</h1>
        <form onSubmit={submitHandler}>
          <label id="transactiontype" className={classes.label}>
            <strong>Transaction Type: </strong>
          </label>
          <div className={classes.select}>
          <input
            type="radio"
            id="withdraw"
            name="transactionType"
            value="Withdraw"
            onChange={transactionTypeChangeHandler}
            checked={transactionType === "Withdraw"}
            disabled={currentBalance < 10000}
          />
          <label htmlFor="withdraw" disabled={currentBalance < 10000}>
            Withdraw
          </label>
          <input
            type="radio"
            id="deposit"
            name="transactionType"
            value="Deposit"
            onChange={transactionTypeChangeHandler}
            checked={transactionType === "Deposit"}
          />
            <label htmlFor="deposit">Deposit</label>
          {currentBalance <= 0 && transactionType === "" && (
            <p className="error-text">You don't have funds to withdraw</p>
          )}
          {currentBalance < 10000 && currentBalance>0 && transactionType === "" && (
            <p className="error-text">Withdrawal not allowed with balance less 10,000</p>
          )}
          { isTransactionTypeSelected === 'no' && (
            <p className="error-text">Please Select transaction Type</p>
          )}
          </div>
          <div className={classes.control}>
            <p className={classes.label}>
              <strong>Current Balance: Rs </strong>
              {currentBalance}
            </p>
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              onBlur={DescriptionBlurHandler}
              onChange={DescriptionChangeHandler}
              value={description}
            />
            {isDescriptionIsInValid && (
              <p className="error-text">Please enter a description</p>
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              onBlur={AmountBlurHandler}
              onChange={AmountChangeHandler}
              value={amount}
            />
            {isAmountIsInValid && (
              <p className="error-text">Please enter a amount</p>
            )}
          </div>
          <div className={classes.button}>
            <Button type="submit" disabled={!isFormValid} variant="contained">
              Transact
            </Button>
          </div>
        </form>
      {/* </SimplePaper> */}
    </Fragment>
  );
};

export default Transact;
