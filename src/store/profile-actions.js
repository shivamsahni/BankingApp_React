import { profileActions } from './profile-slice';
import { db } from '../base';
import { ref, onValue} from "firebase/database";

export const fetchProfileData = (accountNumber) => {

  return async (dispatch) => {

    const path = '/accounts/'+accountNumber;

    try{
        onValue(ref(db, path), snapshot =>{
            if(snapshot.exists()){
                dispatch(profileActions.setProfile(snapshot.val()));
            }
            else{
                //console.log('no profile data available');
            }
        }, {
            onlyOnce: true
          });
    }catch(error){
        console.log(error?.message);
    }

  };
};
