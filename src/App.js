import Layout from "./components/Layout/Layout";
import { Redirect, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Transact from "./pages/Transact";
import {useContext, useEffect} from 'react';
import { AuthContext } from "./Auth";
import {fetchTransactionsData} from './store/transactions-actions';
import {useDispatch} from 'react-redux';
import {fetchProfileData} from './store/profile-actions';

function App() {

  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();

  useEffect(()=>{
    if(authCtx?.accNumber)
    {
      dispatch(fetchProfileData(authCtx.accNumber));
      dispatch(fetchTransactionsData(authCtx.accNumber));
    }  
  },[authCtx, dispatch])

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/auth" >
            <Auth />
          </Route>
          {authCtx?.isLoggedIn && <Route path="/profile" exact>
            <Profile />
          </Route>}
          {authCtx?.isLoggedIn && <Route path="/transact" exact>
            <Transact />
          </Route>}
          <Route path="*" exact>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
