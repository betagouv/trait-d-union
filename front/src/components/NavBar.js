import React from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <header className="header-2">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="header-top">
              <div className="logo-area">
                <a href="index.html"><img src="/logo.png" alt="logo région grand est " /></a>
              </div>
              <div className="header-top-toggler">
                <div className="header-top-toggler-button" />
              </div>


              <div className="top-nav" style={{ display: 'flex' }}>

                <Link to="/poster-offre">
                  <button type="button" class="btn btn-primary btn-lg">
                    <i className="fas fa-plus"></i> Poster une offre d'immersion
                      </button>
                </Link>


              </div>


            </div>

          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
