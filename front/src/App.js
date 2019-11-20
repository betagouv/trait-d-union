// src/App.js
import './App.scss'
import React from 'react'
import NavBar from './components/NavBar'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PostOffre from './components/offres/PostOffre'
import ListOffre from './components/offres/ListOffre'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar/>
        </header>
        <Switch>
          <Route path="/" exact/>
          <Route path="/poster-offre" exact>
            <PostOffre />
          </Route>
          <Route path="/offres" exact>
            <ListOffre />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
