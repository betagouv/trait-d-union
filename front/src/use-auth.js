import React, { createContext, useContext, useEffect, useState } from 'react'
import client from './utils/rest-module'

const authContext = createContext(null)

export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth () {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    await client.post('/candidats/login', { email, password })
    return getUser()
  }

  const register = async (candidat) => {
    await client.post('/candidats/register', candidat)
    return getUser()
  }

  const logout = () => {
    return client.post('/candidats/logout')
      .then(() => setUser(false))
  }

  const getUser = async () => {
    const { data } = await client.get('/candidats/me').catch((err) => {
      console.log(err)
      setUser(false)
      return null
    })
    setUser(data)
    return data
  }

  useEffect(() => {
    getUser().then((data) => {
      setUser(data)
    }).catch(() => {
      setUser(false)
    })
  }, [])

  return {
    user,
    login,
    register,
    logout,
    getUser
  }
}
