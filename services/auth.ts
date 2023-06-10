import { auth, firestore } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { IUser } from "@/app/interfaces/user.interface";
import { collection, doc, setDoc } from "firebase/firestore";

const userRef = collection(firestore, 'users');

export async function logUp(email: string, password: string, newUser: IUser) {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const uid = userCredential.user?.uid;
    localStorage.setItem('uid', uid);
    await setDoc(doc(userRef, uid), {
      idMaster: uid,
      ...newUser
    });
  });
}

export async function logIn(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password).then(data => {
    const uid = data.user?.uid;
    localStorage.setItem('uid', uid);
  });
}

export async function logOut() {
  signOut(auth).then(() => {
    localStorage.removeItem('uid');
    localStorage.removeItem('idMaster');
  });
}