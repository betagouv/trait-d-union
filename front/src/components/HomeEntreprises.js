import React from 'react'
import { Link } from 'react-router-dom'

const HomeEntreprises = () => {

    return (
        <div>
        <div className="hero" role="banner">
          <div className="hero__container">
            <div className="row ">
              <div className="col-md-6 col-sm-6  col-xs-12 ">
                <h1 style={{paddingTop: '1em'}}>Faites découvrir vos métiers pour mieux recruter</h1>
                <p style={{paddingTop: '1em', paddingBottom: '1em'}}>Recevez quelques jours dans votre entreprise des futurs candidats motivés avant leur départ en formation. 
                  Anticipez votre prochaine embauche.
                </p>
                <div style={{paddingTop: '1em', paddingBottom: '1em'}}>
                  <a className="button large btn-xl" href="/poster-offre" style={{width: '100%', display: 'inline-block', textDecoration: 'none', backgroundColor: '#0053B3', color: 'white', cursor: 'pointer', fontFamily: 'Helvetica,Arial,sans-serif', fontSize: '24px', lineHeight: '60px', textAlign: 'center', margin: 0, height: '60px', padding: '0px 40px', borderRadius: '6px', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale'}}>
                    Poster une offre d'immersion                  </a>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12" style={{marginLeft: '0px'}}>
                <div className="slider">
                  <figure>
                    <a className="effect">
                      <img src="https://l.traitdunion.beta.gouv.fr/candidats/images//user_group.svg" />
                    </a>
                    <a className="effect">
                      <img src="https://l.traitdunion.beta.gouv.fr/candidats/images//user_profile.svg" style={{position: 'absolute', top: '50%', WebkitTransform: 'translateY(-50%)', msTransform: 'translateY(-50%)', transform: 'translateY(-50%)', left: 0, right: 0, margin: 'auto', textAlign: 'center'}} />
                    </a>
                    <a className="effect">
                      <img src="https://l.traitdunion.beta.gouv.fr/candidats/images//user_status.svg" style={{position: 'absolute', top: '50%', WebkitTransform: 'translateY(-50%)', msTransform: 'translateY(-50%)', transform: 'translateY(-50%)', left: 0, right: 0, margin: 'auto', textAlign: 'center'}} />
                    </a>
                  </figure>
                  <figcaption />
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
                  <div className="col-md-4 col-sm-6 col-xs-12" style={{padding: '0px', margin: '1em 0 1em 0'}}>
                    <span className="number">1</span>
                    <h3>Je poste une offre d'immersion</h3>
                    <p style={{margin: '5px'}}>Remplissez le métier, votre code postal et votre email. C'est tout. Pas besoin de vous inscrire ou de mettre un mot de passe. On valide en suite dans les 48h votre offre. &nbsp; 
                      <a href="/poster-offre" style={{color: '#0053B3', textDecoration: 'underline', fontSize: '16px'}} > Cliquez ici</a>
                    </p>
                  </div>
                  
                  <div className="col-md-4 col-sm-6 col-xs-12" style={{padding: '0px', margin: '1em 0 1em 0'}}>
                    <span className="number">2</span>
                    <h3>Nous trouvons des candidats</h3>
                    <p style={{margin: '5px'}}>Nous diffusons votre annonce auprès de demandeurs d'emploi vivant autour de votre entreprise et ayant le niveau de qualification minimum. Sur notre site, par email, sur les réseaux sociaux, etc.
                    </p></div>
                  <div className="col-md-4 col-sm-6 col-xs-12" style={{padding: '0px', margin: '1em 0 1em 0'}}>
                    <span className="number">3</span>
                    <h3>Vous faites découvrir votre métier</h3>
                    <p style={{margin: '5px'}}>Il ne vous reste plus qu'à l'accueillir dans votre entreprise le candidat que vous avez choisi. Si le job lui plait, il partira en formation et vous pourrez le recontacter si besoin ensuite.</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
          <section className="section section-white" id="typography">
            <div className="container">
              <div className="row ">
                <div className="col-md-6 col-sm-6  col-xs-12 ">
                  <h2>Quels sont les avantages ? </h2>
                  <p>&nbsp; </p>
                  <ul>
                    <li><b>Donnez l'envie du métier &nbsp;</b> :  Il est important de donner au futur candidat une bonne image de son futur métier, sans bla-bla et de façon concrète. C'est l'occasion aussi de mettre en valeur votre entreprise.
                    </li>
                    <br />
                    <li><b>Réussir le prochain recrutement
                      </b> : dès que vous aurez un poste à pourvoir, vous pourrez reprendre contact avec les meilleurs candidats. Plus d'annonce, plus d'entretien, plus de risque. </li>
                    <br />
                    <li><b>Identifiez des candidats motivés</b> : Motivation, ponctualité, comportement, curiosité, etc faites-vous un carnet d'adresses des meilleurs candidats bientôt disponibles sur le marché du travail. Nos candidats sont motivés car :<br /><br />
                      <ul>
                        <li> ils veulent changer de vie (se reconvertir)</li>
                        <li> ils sont prêts à partir en formation plusieurs mois pour apprendre la théorie</li>
                        <li> ils sont prêts à passer du temps à découvrir le métier avec vous. Gratuitement.</li>
                      </ul><br />
                      Par ailleurs, ces candidats ne sortent pas d'école et ont déjà eu un parcours professionnel .
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-sm-6  col-xs-12 ">
                  <h2>Questions/réponses </h2>
                  <p>&nbsp; </p>
                  <ul>
                    <li><b>À qui s'adresse ce site ?&nbsp;</b> : aux entreprises de la Région Grand Est ayant du mal à recruter des profils motivés. Ou à recruter tout court. </li>
                    <br />
                    <li><b>Est-ce que je peux choisir les profils ?</b> : Nous vous envoyons une liste de candidats, à vous de faire votre choix pour en recevoir un, plusieurs ou aucun. Ils habitent à proximité de votre entreprise.</li>
                    <br />
                    <li><b>Cela dure combien de temps ?</b> : Il n’y aucune obligation de temps. Cela peut être par exemple : 1h (présentation), ½ journée (découverte) ou de 1 à 5 jours (immersion en entreprise). </li>
                    <br />
                    <li><b>Il y a beaucoup de paperasse ?</b> : Non, vous aurez juste a signer avec le demandeur d'emploi et son conseiller pôle emploi une "convention relative à la mise en œuvre d'une période de mise en situation en milieu professionnel" de 2 petites pages (<a href="https://www.formulaires.modernisation.gouv.fr/gf/cerfa_13912.do" target="_blank">télécharger</a>) </li>
                    <br />
                    <li><b>Est-ce gratuit ?</b> : oui, ce site est financé par la Région Grand Est en partenariat avec
                      beta.gouv.fr (DINUM). Les candidats sont payés par Pôle emploi.
                    </li>
                    <br />
                    <li><b>J'ai d'autres questions</b> : pas de soucis, chattez avec nous en cliquant sur l'icône de
                      discussion en bas à droite. On essaie de répondre rapidement.
                    </li>
                  </ul>
                </div>
              </div>
            </div></section>
        </main>
      </div>

    )
}

export default HomeEntreprises
