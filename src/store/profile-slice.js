import { createSlice } from '@reduxjs/toolkit';

const profileInitialState = {username: '', dob: '', accountNumber: 0, accountType: '', state: '', city: ''};

const profileSlice = createSlice({
    name: 'profile',
    initialState: profileInitialState,
    reducers: {
        setProfile(state, actions){
            const profileDetails = actions.payload;
            state.username = profileDetails.username;
            state.dob = profileDetails.dob;
            state.accountNumber = profileDetails.accountNumber;
            state.accountType = profileDetails.accountType;
            state.state = profileDetails.state;
            state.city = profileDetails.city;
        }
    }
})

export const profileActions = profileSlice.actions;

export default profileSlice;
