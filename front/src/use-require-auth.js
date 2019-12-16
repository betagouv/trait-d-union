import { useEffect } from 'react'
import { useAuth } from './use-auth'
import { useRouter } from './use-router'

export function useRequireAuth (redirectUrl) {
  const auth = useAuth()
  auth.redirectUrl = redirectUrl

  const router = useRouter()

  useEffect(() => {
    if (auth.user === false) {
      router.replace('/candidats/login')
    }
  }, [auth, router, redirectUrl])

  return auth
}
