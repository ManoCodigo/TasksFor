'use client';

import '../globals.scss'
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/app-routes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isUserLogged = localStorage.getItem('uid');

  if(isUserLogged)
    router.push(APP_ROUTES.private.home);

  return (
    <html lang="en">
      <body>
        { isUserLogged && null }
        { !isUserLogged && children }
      </body>
    </html>
  )
}
