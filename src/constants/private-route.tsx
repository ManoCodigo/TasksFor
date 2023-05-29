import { useRouter } from "next/navigation"
import { APP_ROUTES } from "./app-routes";

const PrivateRoute = ({ children }: { children: React.ReactNode } ) => {
  const router = useRouter();
  const isUserAutheticade = localStorage.getItem('uid') || '';

  if(!isUserAutheticade)
    router.push(APP_ROUTES.public.login);

  return (
    <>
     { !isUserAutheticade && null }
     { isUserAutheticade && children }
    </>
  )
}

export default PrivateRoute;