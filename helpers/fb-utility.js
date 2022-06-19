import {
    getDatabase,
    onValue,
    push,
    ref,
    remove,
    set,
  } from "firebase/database";

import { firebaseConfig , app } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getUserId } from "./hooks/useAuthentication";
import { schedulePushNotification } from "./Notification";


export function initHistoryDB() {
  if(app!=null){
    return;
  }
  initializeApp(firebaseConfig);
}

export function storeAlarmItem(userId,item) {
    console.log('Writing: ', item);
    const db = getDatabase();
    const reference = ref(db, "users/" + userId);
    push(reference, item);
    
  }

  export function setupAlarmListener(updateFunc) {
    const db = getDatabase();
    const reference = ref(db,"users/"+getUserId())
    onValue(reference, (snapshot) => {
        if (snapshot?.val()) {
          const fbObject = snapshot.val();
          const newArr = [];
          Object.keys(fbObject).map((key, index) => {
            newArr.push({ ...fbObject[key], id: key });
          });
          updateFunc(newArr);
        } else {
          updateFunc([]);
        }
      });
    }

  