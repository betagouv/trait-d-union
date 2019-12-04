import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';



const Footer = () => {

  return (
    <div className="footer-bg">
      <div className="footer-widget-wrapper padding-bottom-60 padding-top-80">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-7 col-xs-12">
              <div className="footer-widget footer-shortcut-link">
                <h4>Qui sommes nous ?</h4>
                
                <p>
                  Trait d'union est un service qui permet aux demandeur d'emploi de la Région Grand Est d'essayer pendant quelques jours des métiers qui recrutent et forment à côté de chez eux.
                  Nous proposons par ailleurs aux entreprises qui le souhaitent de faire découvrir leurs métiers pour mieux recruter par la suite.

                </p>
                
                <p>
                  Nous sommes une petite équipe de 4 personnes, travaillant ensemble à la DINSIC (Paris)
                  et à la Région Grand Est (Metz) depuis début 2019.
                </p>
                <p>
                  La région Grand Est finance la formation de 50 000 personnes en recherche d’emploi par an. Cependant, 45%
                  des stagiaires ne sont pas dans une situation d'emploi 1 an après la fin de la formation. C'est de ce
                  constat qu'est né Trait d'union.
                </p>
              </div>
            </div>
            <div className="col-md-1 col-sm-1  col-xs-12 " />
            <div className="col-md-4 col-sm-4  col-xs-12 ">
              <div className="footer-widget footer-shortcut-link">
                <h4>Liens</h4>
                <ul>
                <li><Link smooth to="/candidats#root">Espace candidats</Link></li>
                <li> <Link smooth to="/entreprises#root">Espace entreprise</Link></li>
                  <li><a target="_blank" rel="noopener noreferrer" href="https://www.grandest.fr">Région Grand Est</a></li>
                  <li><a target="_blank" rel="noopener noreferrer" href="https://beta.gouv.fr">Beta.gouv.fr</a></li>
                  <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/traitdunion.beta.gouv.fr/" title="Facebook">
                      <i className="fab fa-facebook-square" style={{fontSize: "4rem",  marginRight:"1rem" }}></i>
                    </a>
                    <a href="https://twitter.com/TraitdunionBeta" title="Twitter" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter-square" style={{fontSize: "4rem", marginRight:"1rem" }}></i>
                    </a>
                    <a href="mailto:contact@traitdunion.beta.gouv.fr" title="Nous écrire un mail" rel="noopener noreferrer">
                    <i className="fas fa-envelope-square" style={{fontSize: "4rem"}}></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
