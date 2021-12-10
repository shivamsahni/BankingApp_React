import classes from "./AuthStyles.module.css";
import useInput from "../../hooks/useInput";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import app from '../../base';
import { useHistory } from "react-router";
import { AuthContext } from "../../Auth";
import Button from '@mui/material/Button';
import { dbRef } from '../../base';
import { child, get} from "firebase/database";

const Login = () => {

  let history = useHistory();
  const authCtx = useContext(AuthContext);
  let isLoggedIn = authCtx.isLoggedIn;

  const [loginError, SetLoginError] = useState(false);

  const {
    value: accNumber,
    isValidationPassed: isAccNumberValidationsPassed,
    isInValid: isAccNumberIsInValid,
    //Reset: ResetAccNumber,
    OnChangeHandler: AccNumberChangeHandler,
    OnBlurHandler: AccNumberBlurHandler,
  } = useInput((val) => val.length===5);

  const {
    value: password,
    isValidationPassed: isPasswordValidationsPassed,
    isInValid: isPasswordIsInValid,
    //Reset: ResetPassword,
    OnChangeHandler: PasswordChangeHandler,
    OnBlurHandler: PasswordBlurHandler,
  } = useInput((val) => val !== "");

  let isFormValid = isAccNumberValidationsPassed && isPasswordValidationsPassed;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if(!isFormValid)
        return;
    else{
      // check is account number exist or not
        const path = '/accounts/'+accNumber;

        get(child(dbRef, path)).then((snapshot)=>{
            if(snapshot.exists()){
              const auth = getAuth(app);
              authCtx.setPending(true);
              const email = accNumber+'@nagpbank.com'
              signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in 
                authCtx.setPending(false);
                authCtx.login(userCredential?.user);

                history.push('/');
              })
              .catch((error) => {
                const errorMessage = error.message;
                authCtx.setPending(false);
                if(errorMessage==='Firebase: Error (auth/user-not-found).'){
                  SetLoginError(true);
                  return;
                }
                else
                  alert(errorMessage);
              });
            }
            else{
                SetLoginError(true);
            }
        }).catch(error=>{
            console.log(error);
        })
    }
  }

  if(isLoggedIn){
    history.push('/');
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="accountNumber">Account Number</label>
        <input
          id="accountNumber"
          type="number"
          onBlur={AccNumberBlurHandler}
          onChange={AccNumberChangeHandler}
          value={accNumber}
        />
        {isAccNumberIsInValid && <p className="error-text">Please enter a Account Number of length 5</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onBlur={PasswordBlurHandler}
          onChange={PasswordChangeHandler}
          value={password}
        />
        {isPasswordIsInValid && <p className="error-text">Please enter a Password</p>}
      </div>
      {loginError && <p className="error-text">Incorrect Account number or Password</p>}
      <div className={classes.control}>
        <Button type="submit" variant="contained" disabled={!isFormValid}>Login</Button>
      </div>
    </form>
  );
};

export default Login;
