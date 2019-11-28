import React from 'react'

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
            <div className="col-md-1 col-sm-1  col-xs-12 "/>
            <div className="col-md-4 col-sm-4  col-xs-12 ">
              <div className="footer-widget footer-shortcut-link">
                <h4>Liens</h4>
                <ul>
                  <li><a target="_blank" rel="noopener noreferrer" href="https://www.grandest.fr">Région Grand Est</a></li>
                  <li><a target="_blank" rel="noopener noreferrer" href="https://beta.gouv.fr">beta.gouv.fr</a></li>
                </ul>
                <ul>
                  <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/traitdunion.beta.gouv.fr/" title="Facebook">
                    <svg
                      className="icon icon-fb">
                    </svg>
                  </a>
                    <a href="https://twitter.com/TraitdunionBeta" title="Twitter" target="_blank" rel="noopener noreferrer">
                      <svg
                        className="icon icon-twitter">
                      </svg>
                    </a>
                    <a href="mailto:contact@traitdunion.beta.gouv.fr" title="Nous écrire un mail" rel="noopener noreferrer">
                      <svg
                        className="icon icon-mail">
                      </svg>
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
