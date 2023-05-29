import { APP_ROUTES } from "./app-routes";

export const checkIsPublicRoute = (asPath: string) => {
  const appPublicRoute = Object.values(APP_ROUTES.public);
  return appPublicRoute.includes(asPath);
}