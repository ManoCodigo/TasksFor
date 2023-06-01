"use client";

import "../login-register.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { auth } from "../../../../services/firebase";
import { APP_ROUTES } from "@/constants/app-routes";
import { signInWithEmailAndPassword } from "firebase/auth";

// export const metadata = {
//   title: 'Login | TasksFor',
//   description: 'Generated by create next app',
// }

export default function LoginPage() {
  const router = useRouter();

  const [loading, setloading] = useState(false);
  const [userNotFound, setUserNotFound] = useState('');
  const [emailMsgError, setEmailMsgError] = useState('');
  const [emailMsgPassword, setEmailMsgPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function logar() {
    setloading(true);
    await signInWithEmailAndPassword(auth, email, password).then(data => {
      const uid = data.user?.uid || '';
      
      localStorage.setItem('uid', uid);
      router.push(APP_ROUTES.private.home);
    }).catch(err => {
      console.log('error LOGIN >> ', err);

      err.code === 'auth/invalid-email' ? setEmailMsgError(err.message) : setEmailMsgError('');
      err.code === 'auth/wrong-password' ? setEmailMsgPassword(err.message) : setEmailMsgPassword('');
      err.code === 'auth/user-not-found' ? setUserNotFound(err.message) : setUserNotFound('');
    }).finally(() => setloading(false));
  }

  return (
    <>
      <section>
        <form onSubmit={(e) => { logar(), e.preventDefault() }}>
          <div className="form-container">
            <h1>LOGIN</h1>
            <div className="form-login">
              <div className="group-input">
                <label>Email:</label>
                <input type="text" onChange={(email) => setEmail(email.target.value)}/>
                { emailMsgError && 
                  <small className="form-error">{ emailMsgError }</small>
                }
              </div>
              <div className="group-input">
                <label>Senha:</label>
                <input type="password" onChange={(password) => setPassword(password.target.value)}/>
                { emailMsgPassword &&
                  <small className="form-error">{ emailMsgPassword }</small>
                }
              </div>
              { userNotFound &&
                <small className="form-error">{ userNotFound }</small>
              }
            </div>
            <p onClick={(e)=> {router.push(APP_ROUTES.public.register), e.preventDefault()}}>Cadastrar uma nova conta</p>
          </div>
          <button type="submit" disabled={ loading }>Logar</button>
        </form>
      </section>
    </>
  );
}