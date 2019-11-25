import React from 'react'
import Breadcrumb from './common/Breadcrumb'
import useForm from 'react-hook-form'
import client from '../utils/rest-module'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Alert = withReactContent(Swal)

const PostOffre = () => {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async formData => {
    try {
      await client.post('/offres', formData)
      await Alert.fire({
        icon: 'success',
        title: 'Félicitations ! Votre offre a bien été créée et va être diffusée largement !',
        confirmButtonText: 'Poster une nouvelle offre'
      })
      reset()
    } catch (e) {
      console.error(e)
      await Alert.fire({
        icon: 'error',
        title: 'Oh non ! Une erreur s\'est produite. Merci de réessayer ultérieurement.',
        confirmButtonText: 'OK',
        footer: '<a href="mailto:contact@traitdunion.beta.gouv.fr">Nous contacter</a>'
      })
    }
  }

  return (
    <React.Fragment>
      <Breadcrumb title="Poster une offre" pageDescription="Poster une offre d'immersion"/>
      <div className="alice-bg section-padding-bottom">
        <div className="container no-gliters">
          <div className="row no-gliters">
            <div className="col">
              <div className="dashboard-container">
                <div className="dashboard-content-wrapper">
                  <form onSubmit={handleSubmit(onSubmit)} className="dashboard-form job-post-form">
                    <div className="dashboard-section basic-info-input">
                      <h4>
                        Faire découvrir vos métiers grâce à une offre d'immersion (PMSMP)
                      </h4>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Quel métier souhaitez-vous faire découvrir ?</label>
                        <div className="col-md-9">
                          <select id='jobTitle' name='jobTitl'>
                          <option value="0">Cliquez ici pour choisir dans cette liste le métier</option>
  <option value="87187">Accompagnant-e éducatif-ve et social-e</option>
  <option value="82182">Accompagnateur de tourisme</option>
  <option value="82182">Accompagnateur-trice touristique</option>
  <option value="88541">Agent de Médiation</option>
  <option value="30958">Agent-e d’accompagnement auprès des personnes âgées et des personnes dépendantes</option>
  <option value="88525">Agent-e d’entretien du bâtiment</option>
  <option value="103805">Agent-e de maintenance en chauffage</option>
  <option value="96173">Agent-e de prévention et de sécurité SSIAP1</option>
  <option value="96173">Agent-te de prévention et de sécurité</option>
  <option value="96173">Agent-te de prévention et de sécurité</option>
  <option value="77099">Agent-te de Prévention et de Sécurité</option>
  <option value="69623">Animateur-trice périscolaire</option>
  <option value="23196">Assembleur-se au plan industriel</option>
  <option value="23196">Assembleur-se aux plans</option>
  <option value="88309">Assistant</option>
  <option value="81505">Assistant-e commercial-e</option>
  <option value="82685">Assistant-e de direction</option>
  <option value="63193">Assistant-e de gestion PME PMI</option>
  <option value="63193">Assistant-e de gestion PME-PMI</option>
  <option value="57473">Assistant-e de Manager</option>
  <option value="88309">Assistant-e de vie aux familles</option>
  <option value="88309">Assistant-e de vie aux familles - accompagner la personne en situation de handicap vivant à domicile</option>
  <option value="63670">Assistant-e de Vie Dépendance</option>
  <option value="81506">Assistant-e en ressources humaines</option>
  <option value="74844">Attaché-e commercial-e  niveau III</option>
  <option value="81321">Câbleur-se Raccordeur-se</option>
  <option value="90683">Canalisateur-trice</option>
  <option value="88533">Carreleur-euse</option>
  <option value="83150">Carrossier-ère</option>
  <option value="25007">Chef-fe d’équipe aménagement finitions</option>
  <option value="90691">Chef-fe de chantier</option>
  <option value="88121">Coffreur-euse bancheur-euse</option>
  <option value="80728">Commercial-e</option>
  <option value="94559">Commercialisation et Services en Hôtel-Café-Restaurant</option>
  <option value="100805">Concepteur-trice  Développeur-se Informatique</option>
  <option value="100805">Concepteur-trice développeur-se informatique</option>
  <option value="50471">Conducteur d’Installations à mouler sous pression les matériaux métalliques</option>
  <option value="25039">Conducteur du transport routier de marchandises sur porteur</option>
  <option value="25050">Conducteur du transport routier de marchandises sur tous véhicules</option>
  <option value="83333">Conducteur-trice de Bouteur Chargeur</option>
  <option value="83332">Conducteur-trice de Pelle Hydraulique et de Chargeuse Pelleteuse</option>
  <option value="81023">Conducteur-trice du transport interurbain de voyageurs</option>
  <option value="25039">Conducteur-trice du Transport Routier de Marchandises sur Porteur</option>
  <option value="81023">Conducteur-trice du Transport Routier Interurbain de Voyageurs</option>
  <option value="46799">Conduite de production en agriculture biologique</option>
  <option value="87073">Conseiller-ère relation clientèle à distance</option>
  <option value="103767">Constructeur-trice en voirie et réseaux</option>
  <option value="50694">Cordiste Formation aux travaux d’accès difficiles</option>
  <option value="82180">Cuisinier-ère</option>
  <option value="31999">dans les métiers de bouche</option>
  <option value="31999">dans les métiers de bouche pour titulaires d’un niveau V</option>
  <option value="100809">Développeur intégrateur web PHP orienté objet niveau III</option>
  <option value="80737">Développeur-euse d’application orientée objets - spécialisation DOTNET ou Java et application mobile  niveau II</option>
  <option value="100809">Développeur-euse intégrateur web PHP orienté objet</option>
  <option value="100809">Développeur-euse Web et Web mobile</option>
  <option value="100809">Développeur-se de logiciels</option>
  <option value="21072">Diplôme d’Accès aux Etudes Universitaires</option>
  <option value="63041">Dispositif de formation Modulaire - Filière des métiers de la Formation</option>
  <option value="71557">Educateur-trice spécialité Activités Aquatiques et de la Natation</option>
  <option value="100431">Electricien-ne d’équipement</option>
  <option value="82458">Electricien-ne de maintenance sur systèmes automatisés</option>
  <option value="83079">Employé-e commercial-e en magasin</option>
  <option value="21365">Employé-e de vente spécialisé-e</option>
  <option value="88675">Enseignant-e de la Conduite et de Sécurité Routière</option>
  <option value="84522">fonction support aux entreprises</option>
  <option value="25086">Formateur-trice professionnel-le d’adultes</option>
  <option value="82687">Gestionnaire de paie</option>
  <option value="82687">Gestionnaire Paie</option>
  <option value="82686">Installateur-trice Dépanneur-se Informatique</option>
  <option value="21451">Installateur-trice sanitaire et thermique</option>
  <option value="84238">Installateur-trice thermique et sanitaire</option>
  <option value="85117">jardinier-ère paysagiste</option>
  <option value="103615">Licence Professionnelle Métiers de la Comptabilité et de la Gestion : Gestion Comptable et Financière</option>
  <option value="103609">Licence Professionnelle Métiers de la GRH : Assistant parcours type Gestion des Rémunérations</option>
  <option value="87137">Maçon-ne</option>
  <option value="31991">Maintenance des équipement industriels</option>
  <option value="91845">Mécanicien-ne de maintenance automobile</option>
  <option value="31999">Métiers de l’artisanat</option>
  <option value="23199">Métiers de l’industrie</option>
  <option value="79685">Monteur-euse  Régleur-euse d’équipement de fabrication</option>
  <option value="82624">Monteur-se dépanneur-se frigoriste</option>
  <option value="23160">Opérateur Régleur sur Machine Outil à Commande Numérique par enlèvement de matière</option>
  <option value="23196">Opérateur-rice d’assemblage et de fabrication dans les domaines de la chaudronnerie</option>
  <option value="23160">Opérateur-trice  régleur-euse sur machine outil à commandes numériques par enlèvement de matières</option>
  <option value="23160">Opérateur-trice en usinage</option>
  <option value="23160">Opérateur-trice régleur-euse sur machine outil à commandes numériques par enlèvement de matières</option>
  <option value="90683">Ouvrier-ère des TP</option>
  <option value="81194">Peintre en bâtiment</option>
  <option value="83152">peintre en carrosserie</option>
  <option value="101949">Peintre en décor</option>
  <option value="100029">Plaquiste</option>
  <option value="23160">Plateforme productique</option>
  <option value="31991">Polymaintenicien-ne / Pilote de ligne</option>
  <option value="84244">Préparateur-trice de commande</option>
  <option value="84244">Préparateur-trice de commandes</option>
  <option value="84244">Préparateur-trice de commandes en entrepôt</option>
  <option value="21129">Agent-e polyvalent-e de restauration</option>
  <option value="30958">Agent-te de service en EHPAD Niveau V</option>
  <option value="81440">Agent-te magasinier</option>
  <option value="84175">Aide Assembleur - euse au plan Métiers de la transformation des métaux</option>
  <option value="88309">Assistant-e de vie aux familles</option>
  <option value="88309">Assistant-e de vie aux familles CCP2</option>
  <option value="96809">Cableur en fibre optique</option>
  <option value="55824">laveur-euse de vitres et CACES de Plate-forme élévatrice mobile de personnes</option>
  <option value="84522">Modulaire fonction support aux entreprises niveau V</option>
  <option value="84517">Modulaire Fonction Tertiaire - Tous Niveaux</option>
  <option value="84564">Soudeur-se</option>
  <option value="93753">Technicien-ne en logistique d’entreposage</option>
  <option value="100833">Technicien d’assistance en informatique</option>
  <option value="96809">Câbleur Raccordeur de fibre optique Réflectométrie et D3 - Niveau V</option>
  <option value="21609">Peintre applicateur de revêtement</option>
  <option value="94611">Responsable d’Exploitation Agricole</option>
  <option value="58475">Réceptionniste en établissement hôtelier</option>
  <option value="81418">Reponsable de rayon</option>
  <option value="96903">Responsable commercial et marketing digital-niveau II</option>
  <option value="56310">Responsable d’Exploitation Agricole option maraichage biologique</option>
  <option value="74851">Responsable en logistique</option>
  <option value="88547">Robinétier-iere  Mécanicien-ne CQPM</option>
  <option value="56918">Secrétaire assistant-e</option>
  <option value="56918">Secrétaire assistant-te</option>
  <option value="56315">Secrétaire Médico-sociale</option>
  <option value="56918">Secrétaire-assistant-e</option>
  <option value="82774">Serveur-se</option>
  <option value="53827">Superviseur-se relation client à distance</option>
  <option value="105309">Technicien d’équipements d’aide à la personne - niveau IV</option>
  <option value="82779">Technicien en maintenance des systèmes</option>
  <option value="25413">Technicien supérieur géomètre topographe option entreprise de travaux publics</option>
  <option value="73288">Technicien-ne Conseil Vente en alimentation</option>
  <option value="80272">Technicien-ne d’assistance informatique</option>
  <option value="100427">Technicien-ne d’équipement en électricité</option>
  <option value="94757">Technicien-ne d’études du bâtiment option dessin de projet</option>
  <option value="101365">Technicien-ne d’intervention en froid commercial et climatisation</option>
  <option value="83652">Technicien-ne d’usinage sur machines-outils à commande numérique</option>
  <option value="57804">Technicien-ne de maintenance des équipements industriels</option>
  <option value="83076">Technicien-ne de maintenance des équipements thermiques</option>
  <option value="103803">Technicien-ne de maintenance en équipements de chauffage</option>
  <option value="83147">Technicien-ne de maintenance en multimédia et électrodomestique</option>
  <option value="93637">Technicien-ne de maintenance industrielle</option>
  <option value="84578">Technicien-ne en bureau d’étude en électricité</option>
  <option value="94761">Technicien-ne en économie de la construction et étude de prix</option>
  <option value="84579">Technicien-ne en électricité et automatisme du bâtiment</option>
  <option value="100427">Technicien-ne en Equipement Electrique</option>
  <option value="82779">Technicien-ne en maintenance des systèmes</option>
  <option value="84239">Technicien-ne installateur-trice en chauffage</option>
  <option value="63446">Technicien-ne paysagiste</option>
  <option value="81317">Technicien-ne réseau et services très haut débit</option>
  <option value="83602">Technicien-ne supérieur comptable</option>
  <option value="18866">Technicien-ne supérieur-e comptable</option>
  <option value="25382">Technicien-ne supérieur-e de maintenance et exploitation climatique</option>
  <option value="94091">Technicien-ne supérieur-e en automatique & informatique industrielle</option>
  <option value="94141">Technicien-ne supérieur-e en système d’information géographique</option>
  <option value="100813">Technicien-ne Supérieur-e Gestionnaire Exploitant-e des ressources informatiques</option>
  <option value="90803">Technicien-ne usinage</option>
  <option value="73434">Technico-commercial-e des produits agroalimentaires et de l’agrofourniture</option>
  <option value="73433">Technico-commercial-e végétaux d’ornement</option>
  <option value="23199">Tuyauteur-euse</option>
  <option value="93639">Usineur-euse Tourneur-euse Fraiseur-euse sur machine conventionnelle et à commande numérique</option>
  <option value="20182">Vendeur-se</option>
  <option value="77069">Vendeur-se conseil en magasin</option>
  <option value="19004">Vendeur-se Manager Commercial-e</option>
</select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Code postal du lieu de l'immersion ?</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="address"
                                 className="form-control"
                                 placeholder="Exemple : 57100"
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Sur quel email pouvons-nous vous envoyer les candidatures ?</label>
                        <div className="col-md-9">
                          <input type="text"
                                 className="form-control"
                                 name="email"
                                 placeholder="Votre adresse email professionnel"
                                 required="required"
                                 ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label"/>
                      <div className="col-md-9">
                        <button className="button" type="submit">Poster votre offre</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PostOffre
