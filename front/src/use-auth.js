import React, { createContext, useContext, useState, useEffect } from 'react'
import client from './utils/rest-module'

const authContext = createContext(null)

export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

// Provider hook that creates auth object and handles state
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

  const isAuthenticated = async () => {
    return !!user
  }

  const getUser = async () => {
    const { data } = await client.get('/candidats/me')
    setUser(data)
    return data
  }

  useEffect( () => {
    getUser()
  }, [])

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    getUser
  }
}
