// src/App.js
import './App.scss'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import NotFoundPage from './components/NotFoundPage'
import PostOffre from './components/offres/PostOffre'
import Home from './components/Home'
import Header from './components/Header'
import HomeCandidats from './components/HomeCandidats'
import HomeEntreprises from './components/HomeEntreprises'
import CandidatureFormPage from './components/offres/CandidatureFormPage'
import Login from './components/authentication/Login'
import { ProvideAuth } from './use-auth'
import ListOffresPage from './components/offres/ListOffresPage'
import RegisterCandidat from './components/authentication/RegisterCandidat'
import Stats from './components/Stats'

function App () {
  const enterpriseHomeLink = '/entreprises'
  const candidatHomeLink = '/candidats'

  return (
    <ProvideAuth>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <header>
                <Header/>
              </header>
              <Home/>
            </Route>
            <Route path="/stats" exact>
              <header>
                <Header homeLink='/'/>
              </header>
              <Stats/>
            </Route>
            <Route path="/poster-offre" exact>
              <header>
                <Header homeLink={enterpriseHomeLink}/>
              </header>
              <PostOffre/>
            </Route>
            <Route path="/candidats" exact>
              <header>
                <Header homeLink={candidatHomeLink}/>
              </header>
              <HomeCandidats/>
            </Route>
            <Route exact
                   path="/offres/candidature"
                   component={CandidatureFormPage}>
              <CandidatureFormPage/>
            </Route>
            <Route path="/entreprises" exact>
              <header>
                <Header homeLink={enterpriseHomeLink}/>
              </header>
              <HomeEntreprises/>
            </Route>
            <Route exact
                   path="/offres">
              <ListOffresPage/>
            </Route>
            <Route path="/candidats/login" exact>
              <header>
                <Header homeLink="/candidats/login"/>
              </header>
              <Login/>
            </Route>
            <Route path="/candidats/register" exact>
              <header>
                <Header homeLink="/candidats/login"/>
              </header>
              <RegisterCandidat/>
            </Route>
            <Route path="*">
              <header>
                <Header homeLink="/"/>
              </header>
              <NotFoundPage/>
            </Route>
          </Switch>
          <footer>
            <Footer/>
          </footer>
        </BrowserRouter>
      </div>
    </ProvideAuth>
  )
}

export default App
