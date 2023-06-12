import { useRouter } from "next/navigation"
import { APP_ROUTES } from "./app-routes";
import { currentUser, getRole, isUserLogged } from "../../services/auth";
import { auth } from "../../services/firebase";

const PrivateRoute = ({ children }: { children: React.ReactNode } ) => {
  const router = useRouter();
  const isUserAutheticade = isUserLogged();

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