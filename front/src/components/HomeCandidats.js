import React from 'react'
import { Link } from 'react-router-dom'

const HomeCandidats = () => {

  return (
    <div>
      <div className="hero" role="banner">
        <div className="hero__container">
          <div className="row ">
            <div className="col-md-6 col-sm-12  col-xs-12 ">
              <h1 style={{ paddingTop: '1em' }}>Essayez des métiers qui recrutent et forment à côté de chez vous</h1>
              <p style={{ paddingTop: '1em', paddingBottom: '1em' }}>Testez pendant quelques jours des jobs qui recrutent dans le coin. Puis
                entrez en formation et si vous êtes demandeur d'emploi, la Région finance votre formation.
              </p>
              <div style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                <Link to="/offres"
                      className="button large btn-xl"
                      style={{
                        width: '100%',
                        display: 'inline-block',
                        textDecoration: 'none',
                        backgroundColor: '#0053B3',
                        color: 'white',
                        cursor: 'pointer',
                        fontFamily: 'Helvetica,Arial,sans-serif',
                        fontSize: '24px',
                        lineHeight: '60px',
                        textAlign: 'center',
                        margin: 0,
                        height: '60px',
                        padding: '0px 40px',
                        borderRadius: '6px',
                        maxWidth: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: 'bold',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale'
                      }}>
                  VOIR LES METIERS
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12" style={{ marginLeft: '0px' }}>
              <div className="slider">
                <figure>
                  <a className="effect">
                    <img alt="ad" src="https://l.traitdunion.beta.gouv.fr/candidats/images/customer_success.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/waitress.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/bus_driver.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/accountant.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/construction_worker.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/chef.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/customer_service.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/web_developer.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/bartender.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/financial_analyst.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/health_3.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/game_of_throne_-_dany.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/receptionist.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/watering_plants.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/real_estate_agent.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/factory_worker.svg"/>
                  </a>
                  <a className="effect">
                    <img src="https://l.traitdunion.beta.gouv.fr/candidats/images/yoga_position_4.svg"/>
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </div>

      </div>
      <main role="main">
        <section className="section section-grey">
          <h2 className="section__title">Comment ça marche ?</h2>
          <div className="hero__container container">
            <div className="col-lg-12 col-md -12 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12" style={{ padding: '0px', margin: '1em 0 1em 0' }}>
                  <span className="number">1</span>
                  <h3>Je m'inscris</h3>
                  <p style={{ margin: '5px' }}>Inscrivez-vous au service avec votre email, votre adresse, votre niveau de
                    qualification, etc. Cela ne vous engage à rien.
                  </p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12" style={{ padding: '0px', margin: '1em 0 1em 0' }}>
                  <span className="number">2</span>
                  <h3>Je choisis un métier</h3>
                  <p style={{ margin: '5px' }}>Recevez par email chaque semaine <Link style={{ color: '#0053B3', textDecoration: 'underline' }} to="/offres">une liste de
                    métiers</Link> à tester en rapport avec votre niveau
                    de qualification et à moins de 30 km de chez vous.
                  </p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12" style={{ padding: '0px', margin: '1em 0 1em 0' }}>
                  <span className="number">3</span>
                  <h3>Je découvre un job</h3>
                  <p style={{ margin: '5px' }}>Un métier vous intéresse? Candidatez et partez ensuite en immersion (<a
                    href="https://clara.pole-emploi.fr/aides/detail/pmsmp?utm_source=traitdunion" style={{ color: '#0053B3', textDecoration: 'underline'}} target="_blank">PMSMP</a>) de 1 à 3 jours.
                    Vous n'êtes pas payé par l'entreprise mais continuez à toucher vos indemnités de chômage</p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12" style={{ padding: '0px', margin: '1em 0 1em 0' }}>
                  <span className="number">4</span>
                  <h3>Je me forme</h3>
                  <p style={{ margin: '5px' }} >Le test a été concluant? La Région Grand Est finance gratuitement votre formation
                    pour ce métier. Vous trouverez rapidement un travail ensuite</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-white" id="typography">
          <div className="hero__container container">
            <div className="row ">
              <div className="col-md-6 col-sm-6  col-xs-12 ">
                <h2>Pourquoi essayer un métier ?</h2>
                <p>&nbsp; </p>
                <ul>
                  <li><b>Pour réussir votre reconversion professionnelle </b> : vous voulez changer de métier mais ne savez
                    pas dans quoi vous lancer ? Essayez avant des jobs pendant quelques jours, sans aucun risque.
                  </li>
                  <br/>
                  <li><b>Pour réussir votre formation</b> : n'attendez pas la fin de votre formation pour découvrir
                    les réalités du métier. Prenez un premier contact avec une entreprise
                    de votre futur secteur. Cela facilitera votre recherche de stage pendant la formation ou de travail
                    ensuite.
                  </li>
                  <br/>
                  <li><b>Pour trouver rapidement du travail</b> : tous les métiers qui vous seront proposés ici sont dits
                    "en tension", c'est-à-dire que les entreprises de la Région Grand Est n'arrivent pas à recruter.
                    C'est l'assurance pour vous de revenir rapidement à l'emploi
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-sm-6  col-xs-12 ">
                <h2>Questions/réponses </h2>
                <p>&nbsp; </p>
                <ul>
                  <li><b>À qui s'adresse ce site ? </b> : aux demandeurs d'emploi de la Région Grand Est, habitant près de
                    Metz et Nancy (ouverture prochaine dans d'autres villes)
                  </li>
                  <br/>
                  <li><b>Que proposez-vous ?</b> : nous proposons de réaliser des périodes de mise en situation en milieu
                    professionnel (<a href="https://clara.pole-emploi.fr/aides/detail/pmsmp?utm_source=traitdunion"
                                      target="_blank">PMSMP</a>)
                    dans des entreprises partenaires.
                  </li>
                  <br/>
                  <li><b>Est-ce gratuit ?</b> : oui, ce site est financé par la Région Grand Est en partenariat avec
                    beta.gouv.fr (DINUM)
                  </li>
                  <br/>
                  <li><b>J'ai d'autres questions</b> : pas de soucis, chattez avec nous en cliquant sur l'icône de
                    discussion en bas à droite. On essaie de répondre rapidement.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>

  )
}

export default HomeCandidats
