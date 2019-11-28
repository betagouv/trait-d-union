// src/App.js
import './App.scss'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import PostOffre from './components/offres/PostOffre'
import ListOffre from './components/offres/ListOffre'
import Home from './components/Home'
import Header from './components/Header'
import HomeCandidats from './components/HomeCandidats'
import HomeEntreprises from './components/HomeEntreprises'
import CandidatureForm from './components/offres/CandidatureForm'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <header>
              <Header/>
            </header>
            <Home/>
          </Route>
          <Route path="/poster-offre" exact>
            <header>
              <Header/>
            </header>
            <PostOffre/>
          </Route>
          <Route path="/candidats" exact>
            <header>
              <Header/>
            </header>
            <HomeCandidats/>
          </Route>
          <Route path="/offres/candidature" exact>
            <header>
              <Header/>
            </header>
            <CandidatureForm/>
          </Route>
          <Route path="/entreprises" exact>
            <header>
              <Header/>
            </header>
            <HomeEntreprises/>
          </Route>
          <Route path="/entreprises" exact>
            <header>
              <Header/>
            </header>
            <HomeEntreprises/>
          </Route>
          <Route path="/offres" exact>
            <header>
              <Header/>
            </header>
            <ListOffre/>
          </Route>
        </Switch>
        <footer>
          <Footer/>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
