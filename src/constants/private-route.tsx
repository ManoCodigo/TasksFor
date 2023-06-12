import { useRouter } from "next/navigation"
import { APP_ROUTES } from "./app-routes";
import { currentUserId } from "@/app/(authenticated)/users/user-service";

const PrivateRoute = ({ children }: { children: React.ReactNode } ) => {
  const router = useRouter();
  const isUserAutheticade = currentUserId;

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