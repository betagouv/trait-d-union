import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div className="hero" role="banner">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 col-sm-6  col-xs-12 section-grey">
              <h3 style={{paddingTop: '1em'}}>Espace entreprise</h3>
              <h4 style={{paddingTop: '1em', paddingBottom: '1em', color: 'grey'}}>Découvrez comment nous pouvons vous aider à mieux recruter
              </h4>
              
              <img alt="espace entreprise" width="100%" src="https://l.traitdunion.beta.gouv.fr/candidats/images/deal_handshakes.svg" />
              
              <div style={{paddingTop: '1em', paddingBottom: '1em'}}>
                <a className="button large btn-xl" href="/entreprises" style={{width: '100%', display: 'inline-block', textDecoration: 'none', backgroundColor: '#0053B3', color: 'white', cursor: 'pointer', fontFamily: 'Helvetica,Arial,sans-serif', fontSize: '24px', lineHeight: '60px', textAlign: 'center', margin: 0, height: '60px', padding: '0px 40px', borderRadius: '6px', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale'}}>
                <i className="fas fa-building"></i> Je suis une entreprise
                </a>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12" style={{marginLeft: '0px'}}>
              <h3 style={{paddingTop: '1em'}}>Espace candidats</h3>
              <h4 style={{paddingTop: '1em', paddingBottom: '1em', color: 'grey'}}>Essayez des métiers qui recrutent et forment à côté de chez vous
              </h4>
              <center>
              <img alt="espace candidats" width="64.4%" src="https://l.traitdunion.beta.gouv.fr/candidats/images/decide.svg" />
              </center>
              <div style={{paddingTop: '1em', paddingBottom: '1em'}}>
                <a className="button large btn-xl" href="/candidats" style={{width: '100%', display: 'inline-block', textDecoration: 'none', backgroundColor: '#0053B3', color: 'white', cursor: 'pointer', fontFamily: 'Helvetica,Arial,sans-serif', fontSize: '24px', lineHeight: '60px', textAlign: 'center', margin: 0, height: '60px', padding: '0px 40px', borderRadius: '6px', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale'}}>
                <i className="fas fa-user"></i> Je suis un candidat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}

export default Home
