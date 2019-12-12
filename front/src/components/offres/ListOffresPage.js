import { useRequireAuth } from '../../use-require-auth.js'
import React from 'react'
import ListOffre from './ListOffre'
import Header from '../Header'

const ListOffresPage = () => {
  const auth  = useRequireAuth()

  if (!auth.user) {
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

