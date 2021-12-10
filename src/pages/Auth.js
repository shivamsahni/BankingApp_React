import classes from "./Auth.module.css";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Button from "@mui/material/Button";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router";

const Auth = () => {
  const history = useHistory();

  const switchToLoginHandler = () => {
    history.push('/auth/login');
  }

  const switchToRegisterHandler = () => {
    history.push('/auth/register');
  }

  return (
    <section className={classes.auth}>
      <Route path="/auth" exact>
        <Redirect to="/auth/login" />
      </Route>
      <Route path="/auth/login" exact>
      <h1>Login</h1>
        <Login />
        <Button
        variant="contained"
        type="button"
        className={classes.actions && classes.toggle}
        onClick={switchToRegisterHandler}
      >
        Create new Account
      </Button>
      </Route>
      <Route path="/auth/register" exact>
      <h1>Register</h1>
        <Register />
        <Button
        variant="contained"
        type="button"
        className={classes.actions && classes.toggle}
        onClick={switchToLoginHandler}
      >
      Login with existing account
      </Button>
      </Route>
    </section>
  );
};

export default Auth;
