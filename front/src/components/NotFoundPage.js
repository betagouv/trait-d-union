import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <div className="padding-top-80 section-padding-bottom alice-bg">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="section-padding-150 error-page-wrap text-center white-bg">
              <div className="icon">
                <img src="/error.png" className="img-fluid" alt=""/>
              </div>
              <h1>404</h1>
              <p>La page que vous demandez n'existe pas</p>
              <Link to="/" className="button">Revenir à l'accueil</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
