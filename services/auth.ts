import { IUser } from "@/interfaces/user.interface";
import { auth, firestore } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const userRef = collection(firestore, 'users');

export let currentUser: IUser;
export let currentUserId = localStorage.getItem('uid')
export let currentIdMaster: string;
export let role: string;

(() => {
  getRole(currentUserId!);
})()

export async function getRole(uid: string) {
  await fetch(`api/user/user-controller?id=${uid}`)
  .then((res) => res.json())
  .then((data: IUser) => {
    currentUser = data;
    currentIdMaster = data.idMaster!;
    role = data.role;
  });
}

export function isRole(UseRole: string) {
  if(role === UseRole)
    return true
  else
    return false;
}

export function isUserLogged() {
  return localStorage.getItem('uid') ? true : false
}

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
    getRole(uid);
    localStorage.setItem('uid', uid);
  });
}

export async function logOut() {
  signOut(auth).then(() => {
    localStorage.removeItem('uid');
    currentUser = {
      id: '',
      idMaster: '',
      name: '',
      email: '',
      password: '',
      sector: '',
      role: ''
    }
    currentUserId = '';
    currentIdMaster ='';
    role = '';
  });
}