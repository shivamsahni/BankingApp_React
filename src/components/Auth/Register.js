import classes from "./AuthStyles.module.css";
import useInput from "../../hooks/useInput";
import useSelect from "../../hooks/useSelect";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import app from '../../base';
import {db} from '../../base';
import {ref, set} from 'firebase/database';
import { useHistory } from "react-router";
import { AuthContext } from "../../Auth";
import Button from '@mui/material/Button';
import { dbRef } from '../../base';
import { child, get} from "firebase/database";

const accountTypeAllowedOptions = ["", "Saving", "Current"];
const stateTypeAllowedOptions = [
  "",
  "Haryana",
  "Punjab",
  "Uttar Pradesh",
  "Rajasthan",
];
const stateCityAllowedOptions = {
  "": [],
  Haryana: ["", "Gurgaon"],
  Punjab: ["", "Amritsar"],
  "Uttar Pradesh": ["", "Meerut"],
  Rajasthan: ["", "Jaipur"],
};

const Register = () => {

  let history = useHistory();

  let authCtx = useContext(AuthContext);

  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [isTouchedPassword, SetIsTouchedPassword] = useState(false);
  const [isTouchedConfirmPassword, SetIsTouchedConfirmPassword] = useState(false);
  const [isAccNumberAlreadyTaken, SetIsAccNumberAlreadyTaken] = useState(false);  

  const {
    value: username,
    isValidationPassed: isUsernameValidationsPassed,
    isInValid: isUsernameIsInValid,
    //Reset: ResetUsername,
    OnChangeHandler: UsernameChangeHandler,
    OnBlurHandler: UsernameBlurHandler,
  } = useInput((val) => val !== "");

  const {
    value: dob,
    isValidationPassed: isDOBValidationsPassed,
    isInValid: isDOBIsInValid,
    //Reset: ResetDOB,
    OnChangeHandler: DOBChangeHandler,
    OnBlurHandler: DOBBlurHandler,
  } = useInput((val) => val !== "");

  const {
    value: accNumber,
    isValidationPassed: isAccNumberValidationsPassed,
    isInValid: isAccNumberIsInValid,
    //Reset: ResetAccNumber,
    OnChangeHandler: AccNumberChangeHandler,
    OnBlurHandler: AccNumberBlurHandler,
  } = useInput((val) => val.length === 5);

  const {
    value: accType,
    isValidationPassed: isAccTypeValidationsPassed,
    isInValid: isAccTypeIsInValid,
    //Reset: ResetAccType,
    OnChangeHandler: AccTypeChangeHandler,
    OnBlurHandler: AccTypeBlurHandler,
  } = useSelect(accountTypeAllowedOptions, (val) => val !== "");

  const {
    value: state,
    isValidationPassed: isStateValidationsPassed,
    isInValid: isStateIsInValid,
    //Reset: ResetState,
    OnChangeHandler: StateChangeHandler,
    OnBlurHandler: StateBlurHandler,
  } = useSelect(stateTypeAllowedOptions, (val) => val !== "");

  const {
    value: city,
    isValidationPassed: isCityValidationsPassed,
    isInValid: isCityIsInValid,
    //Reset: ResetCity,
    OnChangeHandler: CityChangeHandler,
    OnBlurHandler: CityBlurHandler,
  } = useSelect(stateCityAllowedOptions[state], (val) => val !== "");

  const PasswordChangeHandler = (e) => {
    SetPassword(e.target.value);
  };

  const PasswordBlurHandler = (e) => {
    SetIsTouchedPassword(true);
  };

  const ConfirmPasswordChangeHandler = (e) => {
    SetConfirmPassword(e.target.value);
  };

  const ConfirmPasswordBlurHandler = (e) => {
    SetIsTouchedConfirmPassword(true);
  };

  const isPasswordValidationsPassed = password.length >= 8 ? true : false;

  const isPasswordIsInValid = !isPasswordValidationsPassed && isTouchedPassword;

  const isConfirmPasswordValidationsPassed =
    password !== confirmPassword ? false : true;

  const isConfirmPasswordIsInValid =
    !isConfirmPasswordValidationsPassed && isTouchedConfirmPassword;

  let isFormValid =
    isUsernameValidationsPassed &&
    isDOBValidationsPassed &&
    isAccNumberValidationsPassed &&
    isAccTypeValidationsPassed &&
    isStateValidationsPassed &&
    isCityValidationsPassed &&
    isPasswordValidationsPassed &&
    isConfirmPasswordValidationsPassed;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) return;
    else {

      const path = '/accounts/'+accNumber;

      get(child(dbRef, path)).then((snapshot)=>{
          if(snapshot.exists()){
            SetIsAccNumberAlreadyTaken(true);
            return;
          }
          else{
            const newUser = {
              username,
              accountNumber: accNumber,
              dob,
              accountType: accType,
              state,
              city,
              password,
            };
            authCtx.setPending(true);
            const auth = getAuth(app);
      
            const email = accNumber + "@nagpbank.com";
      
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                authCtx.setPending(false);
                authCtx.login(userCredential?.user);
      
                newUser.uid = userCredential?.user.uid;
      
                set(ref(db, 'accounts/' + accNumber), newUser).then(data=>{
                  // ResetUsername();
                  // ResetAccNumber();
                  // ResetDOB();
                  // ResetAccNumber();
                  // ResetAccType();
                  // ResetState();
                  // ResetCity();
                  // SetPassword("");
                  // SetConfirmPassword("");
                  // SetIsTouchedPassword(false);
                  // SetIsTouchedConfirmPassword(false);
                  history.push('/');
                }).catch(error=>{
                  console.log(error.message);
                })

              })
              .catch((error) => {
                const errorMessage = error.message;
                authCtx.setPending(false);
                alert(errorMessage);
                // ..
              });
          }

    }).catch(error=>{
      console.log(error);
    })
  } 
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="username">User name</label>
        <input
          id="username"
          type="text"
          onBlur={UsernameBlurHandler}
          onChange={UsernameChangeHandler}
          value={username}
        />
        {isUsernameIsInValid && (
          <p className="error-text">Please enter a User name</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          onBlur={DOBBlurHandler}
          onChange={DOBChangeHandler}
          value={dob}
        />
        {isDOBIsInValid && (
          <p className="error-text">Please enter a Date of Birth</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="accountNumber">Account Number</label>
        <input
          id="accountNumber"
          type="number"
          onBlur={AccNumberBlurHandler}
          onChange={AccNumberChangeHandler}
          value={accNumber}
        />
        {isAccNumberIsInValid && (
          <p className="error-text">Please enter a Account Number of Length 5</p>
        )}
        {isAccNumberAlreadyTaken && (
          <p className="error-text">Account number already taken try different one</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="accountType">Account Type</label>
        <select
          id="accountType"
          onBlur={AccTypeBlurHandler}
          onChange={AccTypeChangeHandler}
          value={accType}
        >
          {accountTypeAllowedOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {isAccTypeIsInValid && (
          <p className="error-text">Please Select a Account Type</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="state">State</label>
        <select
          id="state"
          onBlur={StateBlurHandler}
          onChange={StateChangeHandler}
          value={state}
        >
          {stateTypeAllowedOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {isStateIsInValid && (
          <p className="error-text">Please Select a State</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <select
          id="city"
          onBlur={CityBlurHandler}
          onChange={CityChangeHandler}
          value={city}
        >
          {stateCityAllowedOptions[state].map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {isCityIsInValid && <p className="error-text">Please Select a City</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          onBlur={PasswordBlurHandler}
          onChange={PasswordChangeHandler}
          value={password}
        />
        {isPasswordIsInValid && (
          <p className="error-text">
            Please enter a Password and it should be atleast 8 character long
          </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="text"
          onBlur={ConfirmPasswordBlurHandler}
          onChange={ConfirmPasswordChangeHandler}
          value={confirmPassword}
        />
        {isConfirmPasswordIsInValid && (
          <p className="error-text">
            Password and Confirm Password didn't matched
          </p>
        )}
      </div>
      <div className={classes.control}>
        <Button type="submit" variant="contained" disabled={!isFormValid}>Register</Button>
      </div>
    </form>
  );
};

export default Register;