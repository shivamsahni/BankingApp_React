import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../Auth";
import ListTransactions from "../components/Transactions/ListTransactions";
import NotLoggedIn from './NotLoggedIn';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Profile from "./Profile";
import Transact from "./Transact";


const Dashboard = () => {
    const authCtx = useContext(AuthContext);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
    <Fragment>
      {!authCtx?.isLoggedIn &&   <NotLoggedIn />}   
      {authCtx?.isLoggedIn && <Box elevation = {3} sx={{ width: '100%', bgcolor: 'background.paper'}}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Transactions" />
          <Tab label="Transact" />
          <Tab label="Profile" />
        </Tabs>
        {value===0 && <ListTransactions />}
        {value===1 && <Transact />}
        {value===2 && <Profile />}
      </Box>}
      </Fragment>
    );

}

export default Dashboard;