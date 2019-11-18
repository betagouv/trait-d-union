// src/App.js
import './App.scss'
import React from 'react'
import NavBar from './components/NavBar'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import PostOffre from './components/PostOffre'

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
          <PrivateRoute path="/profile" component={Profile}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
