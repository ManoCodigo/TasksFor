'use client';

import '../globals.scss'
import './home.scss'
import ActiveLinkButton from '../../../components/activeLinkButton/activeLinkButton';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../../../services/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { checkIsPublicRoute } from '@/constants/check-public-route';
import PrivateRoute from '@/constants/private-route';
import { APP_ROUTES } from '@/constants/app-routes';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { IUser } from '../interfaces/user.interface';

// export const metadata = {
//   title: 'Home | TasksFor',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }: { children: React.ReactNode } ) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState('N/A');

  const isPublicPage = checkIsPublicRoute(pathname);

  auth.onAuthStateChanged(userLogged => {
    if(!userLogged)
      localStorage.removeItem('uid')

    console.log('onAuthStateChanged >> ', userLogged)
  })

  useEffect(() => {
    const uidUser = localStorage.getItem('uid') || '';
    getUser(uidUser);
  }, [userName]);

  async function getUser(uid: any) {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    setUserName(userData?.name);
  }

  async function logout() {
    signOut(auth).then(() => {
      localStorage.removeItem('uid');
      router.push(APP_ROUTES.public.login);
    }).catch((error) => {
      console.log('error LOGOUT', error)
    });
  }

  return (
    <>
      <html lang="en">
        <body>
          { !isPublicPage && 
            <PrivateRoute>
              <header>
                <h1>TasksFor</h1>
                <nav>
                  <ul>
                    <ActiveLinkButton title={'Inicio'} href={'/'} />
                    <ActiveLinkButton title={'Quadro'} href={'/tasks'} />
                    <ActiveLinkButton title={'Equipe'} href={'/users'} />
                    <button className="link" onClick={logout} >{ userName }</button>
                  </ul>
                </nav>
              </header>

              <main>
                { children }
              </main>
            </PrivateRoute>
          }
        </body>
      </html>
    </>
  )
}
