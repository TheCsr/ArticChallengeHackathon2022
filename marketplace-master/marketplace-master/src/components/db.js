
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwK4vbXKiBySqxVFefhlzWsPiKNWe7Tl8",
  authDomain: "artichackathon.firebaseapp.com",
  projectId: "artichackathon",
  storageBucket: "artichackathon.appspot.com",
  messagingSenderId: "797530308027",
  appId: "1:797530308027:web:2fa3d361d84a61fbe6589e",
  measurementId: "G-HR37K4H3RS"
};

const app = initializeApp(firebaseConfig);
export const database =  getFirestore(app)

