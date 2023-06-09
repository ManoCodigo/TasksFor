
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA7QYoC5GBfNkmYcVM9ScT9WSS0SFEoHlw",
  authDomain: "taskfor-6b3ff.firebaseapp.com",
  projectId: "taskfor-6b3ff",
  storageBucket: "taskfor-6b3ff.appspot.com",
  messagingSenderId: "525544983706",
  appId: "1:525544983706:web:f964cc2c4f7207cf992323"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };