'use client';

import Link, { LinkProps } from 'next/link'
import '../globals.scss'
import './home.scss'
import { useRouter, usePathname } from 'next/navigation';

export const metadata = {
  title: 'Home | TasksFor',
  description: 'Generated by create next app',
}

type ActiveLinkProps = {
  children: React.ReactNode 
} & LinkProps;

export default function RootLayout({ children, href, ...rest }: ActiveLinkProps) {

  const router = useRouter();
  const pathName = usePathname();
  
  function navigation(route: string) {
    router.push(route);
  }

  return (
    <html lang="en">
      <body>
        <header>
          <h1>TasksFor</h1>
          <nav>
            <ul>
              <li onClick={() => navigation('/')}>Inicio</li>
              <li onClick={() => navigation('/users')}>Equipe</li>
              <li onClick={() => navigation('/tasks')}>Tarefas</li>
              <li onClick={() => navigation('/login')}>Login</li>
            </ul>
          </nav>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  )
}