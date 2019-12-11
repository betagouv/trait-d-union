import { useEffect } from "react";
import { useAuth } from "./use-auth";
import { useRouter } from "./use-router";

export function useRequireAuth(redirectUrl = '/candidats/login'){
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user){
      router.push(redirectUrl);
    }
  }, [auth, router, redirectUrl]);

  return auth;
}
