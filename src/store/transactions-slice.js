import { configureStore } from '@reduxjs/toolkit' ;
import { createSlice } from '@reduxjs/toolkit';
import profileSlice from './profile-slice';

const transactionsInitialState = {currentBalance: 0, allTransactions: [], changed: false};

const calculateCurrentBalance = (inputTransactions)=>{
    let currentBalance = 0;

    inputTransactions.forEach(transaction => {
        if(transaction.transactionType==='Withdraw'){
            currentBalance-=parseInt(transaction.amount);
        }
        else if(transaction.transactionType==='Deposit'){
            currentBalance+=parseInt(transaction.amount);
        }
    })

    return currentBalance;
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: transactionsInitialState,
    reducers: {
        addTransactionToTransactions(state, actions){
            const newTransaction = actions.payload;
            if(newTransaction.transactionType==='Withdraw'){
                state.currentBalance-=parseInt(newTransaction.amount);
            }
            else if(newTransaction.transactionType==='deposit'){
                state.currentBalance+=parseInt(newTransaction.amount);
            }
            state.changed = true;
            state.allTransactions.push(newTransaction);
        },
        replaceTransactions(state, actions){
            state.allTransactions = actions.payload;
            state.currentBalance = calculateCurrentBalance(actions.payload);
        },
        reset(state){
            state.currentBalance=0;
            state.allTransactions=[];
            state.changed=false;
        }
    }
})

const store = configureStore({
    reducer: {transactions: transactionsSlice.reducer, profile: profileSlice.reducer}
})

export const transactionsActions = transactionsSlice.actions;

export default store;
