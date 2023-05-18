import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBt2nvsw2eYl4Ek9u8AP2T5qozdDrHixA",
  authDomain: "nxt-express-ba92b.firebaseapp.com",
  databaseURL: "https://nxt-express-ba92b-default-rtdb.firebaseio.com",
  projectId: "nxt-express-ba92b",
  storageBucket: "nxt-express-ba92b.appspot.com",
  messagingSenderId: "841232010902",
  appId: "1:841232010902:web:6f79a42316041c6b5bfcb7",
  measurementId: "G-MYSXL5L6DV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Auth1 = getAuth(app)
export {
db, Auth1
}


