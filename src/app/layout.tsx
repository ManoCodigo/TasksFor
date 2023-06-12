'use client';

import '../globals.scss'
import './home.scss'
import ActiveLinkButton from '../../components/activeLinkButton/activeLinkButton';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { checkIsPublicRoute } from '@/constants/check-public-route';
import PrivateRoute from '@/constants/private-route';
import { APP_ROUTES } from '@/constants/app-routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { currentUser, currentUserId, getRole, logOut } from '../../services/auth';
import { IUser } from '@/interfaces/user.interface';
import LoginPage from './login/page';
import PublicRoute from '@/constants/public-route';
library.add(fas);

// export const metadata = {
//   title: 'Home | TasksFor',
//   description: 'Generated by create next app',
// }

export let currentIdMaster: string;
export let role: string;

export default function RootLayout({ children }: { children: React.ReactNode } ) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname!);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadAll();
  }, []);
  
  async function loadAll() {
    await getRole(currentUserId!)
    setLoading(true);
  }

  async function signOut() {
    logOut()
      .then(() => router.push(APP_ROUTES.public.login));
  }

  return (
    <>
      <html lang="en">
        <body>
          { !isPublicPage && loading && 
            <PrivateRoute>
              <header>
                <h1>TasksFor</h1>
                <nav>
                  <ul>
                    <ActiveLinkButton title={'Inicio'} href={'/'} />
                    <ActiveLinkButton title={'Quadro'} href={'/tasks'} />
                    <ActiveLinkButton title={'Equipe'} href={'/users'} />
                    <button className="link" onClick={signOut} >
                      { currentUser?.name }
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      </button>
                  </ul>
                </nav>
              </header>

              <main>
                { children }
              </main>
            </PrivateRoute>
          }

          { isPublicPage &&
            <PublicRoute>
              { children }
            </PublicRoute>
          }
        </body>
      </html>
    </>
  )
}
