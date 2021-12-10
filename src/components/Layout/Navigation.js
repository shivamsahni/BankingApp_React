import * as React from 'react';
import app from "../../base";
import { getAuth} from "firebase/auth";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Auth";
import { useDispatch } from "react-redux";
import { transactionsActions } from "../../store/transactions-slice";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Navigation = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const auth = getAuth(app);
  const authCtx = useContext(AuthContext);

  const LogoutHandler = () => {
    auth.signOut();
    authCtx.logout();
    dispatch(transactionsActions.reset())
    history.push("/auth/login");
  };

  const LoginHandler = () => {
    history.push("/auth/login");
  };

  const RegisterHandler = () => {
    history.push("/auth/register");
  };

  const DashboardHandler = () => {
    history.push('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: '#88dfdf', color: 'black'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={DashboardHandler}
          >
            <AccountBalanceIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             NAGP Bank
          </Typography>
          
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>

          {!authCtx?.isLoggedIn && <Button color="inherit" onClick={LoginHandler}>Login</Button>}
          {!authCtx?.isLoggedIn && <Button color="inherit" onClick={RegisterHandler}>Register</Button>}
          {authCtx?.isLoggedIn && <Button color="inherit" onClick={LogoutHandler}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );










};

export default Navigation;
