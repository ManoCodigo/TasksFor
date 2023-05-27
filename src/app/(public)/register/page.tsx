"use client";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import "../login-register.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../../../../services/firebase";
import { getApp, getApps } from "firebase/app";
// import { collection, setDoc, doc } from "firebase/firestore";

// export const metadata = {
//   title: 'Login | TasksFor',
//   description: 'Generated by create next app',
// }

export default function RegisterPage() {
  const router = useRouter();

  const userRef = collection(firestore, 'users');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  function register() {
    try {
      createUserWithEmailAndPassword(email, password).then(data => {
        const uid = data?.user.uid;
        const userData = {
          email: email,
          name: name,
          role: 'adm',
        };
        setDoc(doc(userRef, uid), userData);
        auth.currentUser?.reload();
      });
      router.push('/');
    } catch(err) {
      console.log(err)
    }

    console.log('user >> ', user)
    console.log('currentUser >> ', auth.currentUser)
  }
  
  // if (loading) 
  //   return <p>C A R R E G A N D O . . .</p>
  // if (loading) 
  //   return <p>C A R R E G A N D O . . .</p>

  return (
    <>
      <section>
        <form onSubmit={(e) => { register(), e.preventDefault() }}>
          <div className="form-container">
            <h1>REGISTER 1</h1>
            <div className="form-login">

              <div className="group-input">
                <label>Name:</label>
                <input type="text" onChange={(name) => setName(name.target.value)}/>
              </div>
              <div className="group-input">
                <label>Email:</label>
                <input type="email" onChange={(email) => setEmail(email.target.value)}/>
              </div>
              <div className="group-input">
                <label>Senha:</label>
                <input type="password" onChange={(password) => setPassword(password.target.value)}/>
              </div>
              
            </div>
            <p onClick={(e)=> { router.push('/login'), e.preventDefault() }}>Logar com uma conta</p> 
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </section>
    </>
  )
}