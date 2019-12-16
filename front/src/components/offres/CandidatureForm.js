import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import useForm from 'react-hook-form'
import client from '../../utils/rest-module'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from '../../use-router'
import niveauxEtude from '../../utils/enums/niveaux-etude'
import { useRequireAuth } from '../../use-require-auth'

const deStatuses = require('../../utils/enums/de-statuses')

const Alert = withReactContent(Swal)

const CandidatureForm = ({ offre }) => {
  const { user } = useRequireAuth()
  const router = useRouter()
  const { register, handleSubmit, reset, setValue } = useForm()
  const [isSubmitted] = useState(false)

  useEffect(() => {
    ['email', 'firstName', 'lastName', 'phoneNumber', 'niveauEtude', 'zipCode', 'birthdate', 'deStatus'].forEach(field => {
      setValue(field, user && user[field])
    })
  }, [router, setValue, user])

  if (!user) {
    return <div>Chargement ... </div>
  }

  const onSubmit = async formData => {
    try {
      const profile = Object.assign({}, formData)
      delete profile.email
      await client.patch(`/candidats/me`, profile)
      await client.post(`/offres/${offre.id}/candidatures`)
      await Alert.fire({
          icon: 'success',
          timer: 3500,
          title: `Merci ${user.firstName}, nous allons envoyé votre demande à l'entreprise. Regardez sur la liste si d'autres offres vous intéressent et postulez`,
          confirmButtonText: 'Revenir à la liste des offres',
          onClose: () => window.open('/offres?submit_candidature_ok=true', '_parent')
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

  return (
    <React.Fragment>
      <Breadcrumb title={`Essayez ce métier : ${offre.jobTitle}`} pageDescription="Envoyez une candidature"/>
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
                        <label className="col-md-3 col-form-label">Merci de saisir votre email *</label>
                        <div className="col-md-9">
                          <input disabled
                                 type="text"
                                 className="form-control"
                                 name="email"
                                 placeholder="Votre adresse email"
                                 required="required"
                                 ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Quelle est votre situation ?</label>
                        <div className="col-md-9">
                          <select name="deStatus"
                                  className="form-control"
                                  placeholder="Quelle est votre situation ?"
                                  required="required"
                                  ref={register({ required: true })}>
                            <option defaultValue disabled>Quelle est votre situation ?</option>
                            {deStatuses.map((deStatus) =>
                              <option key={deStatus.id} value={deStatus.id}>{deStatus.label}</option>
                            )}
                          </select>
                          <i className="fa fa-caret-down"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Prénom *</label>
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
                        <label className="col-md-3 col-form-label">Nom *</label>
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
                        <label className="col-md-3 col-form-label">Téléphone *</label>
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
                        <label className="col-md-3 col-form-label">Date de naissance *</label>
                        <div className="col-md-9">
                          <input type="date"
                                 name="birthdate"
                                 className="form-control"
                                 placeholder="Date de naissance *"
                                 required="required"
                                 ref={register({
                                   required: true
                                 })}>
                          </input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Code postal de votre ville *</label>
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
                        <label className="col-md-3 col-form-label">Niveau d'étude actuel *</label>
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
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label"/>
                      <div className="col-md-9">
                        <button className="button"
                                disabled={isSubmitted}
                                type="submit">Envoyer ma candidature à l'entreprise pour essayer ce métier
                        </button>
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

export default CandidatureForm
