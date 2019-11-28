import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import useForm from 'react-hook-form'
import client from '../../utils/rest-module'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { StringParam, useQueryParam } from 'use-query-params'
import { useLocation } from 'react-router-dom'

const Alert = withReactContent(Swal)

const niveauxEtude = [
  { id: 'sans-diplome', label: 'Sans diplôme' },
  { id: 'cap-bep', label: 'CAP-BEP' },
  { id: 'bac-0-1', label: 'Bac ou Bac+1' },
  { id: 'bac-2', label: 'Bac+2' },
  { id: 'bac-3-4', label: 'Bac+3 ou Bac+4' },
  { id: 'bac-5', label: 'Bac + 5 et supérieur' }
]

const CandidatureForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const location = useLocation()
  const [offre, setOffre] = useState(location.state && location.state.offre)
  const [offreId] = useQueryParam('offreId', StringParam)

  useEffect(() => {
    async function fetchOffre () {
      try {
        const { data } = await client.get(`/offres/${offreId}`)
        setOffre(data)
      } catch (e) {
        throw e
      }
    }

    if (!offre) {
      redirectToOffresListIfOffreIsNotValid(fetchOffre)
    }
  }, [offre, offreId])

  const onSubmit = async formData => {
    try {
      formData.offreId = offre.id
      console.log(formData)
      await client.post('/candidatures', formData)
      await Alert.fire({
          icon: 'success',
          title: `Merci ${formData.firstName}, nous enverrons votre demande à l'entreprise bientôt. ` +
            'S\'il y a beaucoup de demandes et que vous ne pouvez faire l\'essai, nous proposerons votre candidature pour le même métier' +
            ` (${offre.jobTitle}) et dans la même zone géographique à une entreprise similaire.`,
          confirmButtonText: 'Revenir à la liste des offres',
          onClose: () => window.open('/offres', '_parent')
        }
      )
      reset()
    } catch (e) {
      await Alert.fire({
        icon: 'error',
        title: 'Oh non ! Une erreur s\'est produite. Merci de réessayer ultérieurement.',
        confirmButtonText: 'OK',
        footer: '<a href="mailto:contact@traitdunion.beta.gouv.fr">Nous contacter</a>'
      })
    }
  }

  if (!offre) {
    return (
      <div>Récupération de l'offre en cours...</div>
    )
  }
  return (
    <React.Fragment>
      <Breadcrumb title={`Essayer le métier de ${offre.jobTitle}`} pageDescription="Envoyer une candidature"/>
      <div className="alice-bg section-padding-bottom">
        <div className="container no-gliters">
          <div className="row no-gliters">
            <div className="col">
              <div className="dashboard-container">
                <div className="dashboard-content-wrapper">
                  <form onSubmit={handleSubmit(onSubmit)} className="dashboard-form job-post-form">
                    <div className="dashboard-section basic-info-input">
                      <h4>
                        Afin de découvrir le métier de {offre.jobTitle}, merci de nous fournir quelques informations sur vous.
                      </h4>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Merci de saisir votre email</label>
                        <div className="col-md-9">
                          <input type="text"
                                 className="form-control"
                                 name="email"
                                 placeholder="Votre adresse email"
                                 required="required"
                                 ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Identifiant Pôle emploi (si vous êtes demandeur d'emploi)</label>
                        <div className="col-md-9">
                          <input autoFocus
                                 type="text"
                                 name="poleEmploiId"
                                 className="form-control"
                                 placeholder="Exemple : 3051721Y"
                                 ref={register({ required: false })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Prénom</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="firstName"
                                 className="form-control"
                                 placeholder=""
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Nom</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="lastName"
                                 className="form-control"
                                 placeholder=""
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Téléphone</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="phoneNumber"
                                 className="form-control"
                                 placeholder=""
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Âge</label>
                        <div className="col-md-9">
                          <input type="number"
                                 name="age"
                                 className="form-control"
                                 placeholder="Exemple: 32"
                                 required="required"
                                 ref={register({ required: false })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Code postal de votre ville</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="zipCode"
                                 className="form-control"
                                 placeholder="(pour ne pas vous proposer de tester un job à 86 km de chez vous)"
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Niveau d'étude actuel</label>
                        <div className="col-md-9">
                          <select name="niveauEtude"
                                  className="form-control"
                                  placeholder=""
                                  required="required"
                                  ref={register({ required: true })}>
                            {niveauxEtude.map((niveauEtude) =>
                              <option key={niveauEtude.id} value={niveauEtude.id}>{niveauEtude.label}</option>
                            )}
                          </select>
                          <i className="fa fa-caret-down"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Vous pouvez saisir d'autres métier que vous voudriez tester, en plus de
                          celui de {offre.jobTitle}, si vous avez déjà des idées</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="otherJobs"
                                 className="form-control"
                                 placeholder="Si vous n'avez pas d'idée, pas de soucis"
                                 ref={register({ required: false })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Si le job de {offre.jobTitle} vous plait bien, seriez-vous
                          éventuellement d'accord pour partir en formation afin de pouvoir faire ce métier ?</label>
                        <div className="col-md-9">
                          <input type="checkbox"
                                 id="acceptFollowingTraining"
                                 name="acceptFollowingTraining"
                                 className="form-check-input"
                                 placeholder=""
                                 defaultChecked={true}
                                 ref={register({ required: false })}
                          />
                          <label className="form-check-label" htmlFor="acceptFollowingTraining">Accepter</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label"/>
                      <div className="col-md-9">
                        <button className="button" type="submit">Envoyer ma candidature</button>
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

function redirectToOffresListIfOffreIsNotValid (fetchOffre) {
  fetchOffre().catch(() => {
    Alert.fire({
      icon: 'error',
      title: 'Cette offre n\'est plus disponible. Vous allez être redirigé vers la liste des offres.',
      confirmButtonText: 'OK',
      onClose: () => window.open('/offres', '_parent'),
      footer: '<a href="mailto:contact@traitdunion.beta.gouv.fr">Nous contacter</a>'
    })
  })
}

export default CandidatureForm
