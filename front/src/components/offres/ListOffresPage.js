import { useRequireAuth } from '../../use-require-auth.js'
import React from 'react'
import ListOffre from './ListOffre'
import Header from '../Header'

const ListOffresPage = () => {
  const { isAuthenticated } = useRequireAuth()

  if (!isAuthenticated()) {
    console.log('not Authenticated', )
    return <div>Chargement...</div>
  }

  return (
    <React.Fragment>
      <header>
        <Header homeLink='/candidats'/>
      </header>
      <ListOffre/>
    </React.Fragment>
  )
}

export default ListOffresPage

