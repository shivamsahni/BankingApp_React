import { useSelector } from "react-redux";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AtmRoundedIcon from '@mui/icons-material/AtmRounded';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Divider from '@mui/material/Divider';
import moment from 'moment'

const Profile = () => {
 
    const profile = useSelector(state => state.profile);
    const transactions = useSelector(state => state.transactions);

    return (
        <List
          sx={{
            width: '100%',
            maxWidth: 450,
            bgcolor: 'background.paper',
            ml: 1
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AtmRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Account Number" secondary={profile.accountNumber} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BallotRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Account Type" secondary={profile.accountType} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocalAtmRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Current Balance" secondary={transactions.currentBalance} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
            <Avatar>
                <PersonSharpIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="User name" secondary={profile.username} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DateRangeRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Date of Birth" secondary={moment(profile.dob).format("D MMM YYYY")} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <RoomRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="State" secondary={profile.state} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <RoomRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="City" secondary={profile.city} />
          </ListItem>
        </List>
      );    

}

export default Profile;

