import { useRouter } from "next/navigation"
import { APP_ROUTES } from "./app-routes";
import { isUserLogged } from "../../services/auth";

const PublicRoute = ({ children }: { children: React.ReactNode } ) => {
  const router = useRouter();
  const isUserAutheticade = isUserLogged();
  
  if(isUserAutheticade)
    router.push(APP_ROUTES.private.home);
  
  return (
    <>
     { isUserAutheticade && null }
     { !isUserAutheticade && children }
    </>
  )
}

export default PublicRoute;