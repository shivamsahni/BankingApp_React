import { transactionsActions } from './transactions-slice';
import { db } from '../base';
import { ref, onValue} from "firebase/database";

export const fetchTransactionsData = (accountNumber) => {
  return async (dispatch) => {

    if(accountNumber){

        const path = 'transactions/'+accountNumber;

        try {
            onValue(ref(db, path), snapshot =>{
                if(snapshot.exists()){
                    const receivedTransactions = snapshot.val();
                    const allTransactions = [];

                    for(const key in receivedTransactions){
                        allTransactions.push(receivedTransactions[key]);
                    }

                    dispatch(transactionsActions.replaceTransactions(allTransactions));
                }
                else{
                    //console.log('no profile data available');
                }
            });
    
        } catch (error) {
          alert('failed to fetch transactions data...');
        }
    }

  };
};
