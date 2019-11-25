import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

  return (
    <header className="header-2">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="header-top">
              <div className="logo-area">
                <Link to="/">
                  <img src="/logo-ge.png" class="logoge" alt="logo région grand est "/> <img src="/logo-tu.png" alt="lgo trait d'union"></img>
                </Link>
              </div>
            </div>
            <nav className="navbar navbar-expand-lg cp-nav-2">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="menu-item">
                    <Link to="/">
                      Accueil
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/offres">
                      Liste des offres
                    </Link>
                  </li>
                  <li className="menu-item post-job">
                    <Link to="/poster-offre">
                      <i className="fas fa-plus"/>
                      Poster une offre d'immersion
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

        </div>
      </div>
    </header>
  )
}

export default NavBar
