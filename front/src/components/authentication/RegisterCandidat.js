import React, { useState } from 'react'
import useForm from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '../../use-auth'
import { Link } from 'react-router-dom'

const niveauxEtude = require('../../utils/enums/niveaux-etude')
const deStatuses = require('../../utils/enums/de-statuses')

const Alert = withReactContent(Swal)

const RegisterCandidat = () => {
  const [isSubmitted] = useState(false)
  const { register: registerCandidat } = useAuth()
  const { register, handleSubmit, errors, getValues } = useForm()

  const onSubmit = async formData => {
    try {
      const userToCreate = Object.assign({}, formData)
      delete userToCreate.confirmPassword
      const user = await registerCandidat(userToCreate)
      await Alert.fire({
        icon: 'success',
        title: `Merci de rejoindre Trait d'Union ${user.firstName} ${user.lastName} !`,
        confirmButtonText: 'Ok',
        onClose: () => window.open('/offres', '_parent')

      })
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
      <div className="padding-top-70 padding-bottom-70 ">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <div className="access-form">
                <div className="form-header">
                  <h3>Inscription</h3>
                </div>
                <div className="dashboard-container">
                  <div className="dashboard-content-wrapper">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="email">
                          Votre adresse email *
                        </label>
                        <div className="col-md-9">
                          <input autoFocus
                                 type="email"
                                 name="email"
                                 placeholder="Votre adresse email *"
                                 className="form-control"
                                 required="required"
                                 ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="deStatus">
                          Quelle est votre situation ? *
                        </label>
                        <div className="col-md-9">
                          <select name="deStatus"
                                  className="form-control"
                                  placeholder="Quelle est votre situation ?"
                                  required="required"
                                  ref={register({ required: true })}>
                            <option value="">Choisissez dans la liste</option>
                            {deStatuses.map((deStatus) =>
                              <option key={deStatus.id} value={deStatus.id}>{deStatus.label}</option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="firstName">
                          Prénom *
                        </label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="firstName"
                                 className="form-control"
                                 placeholder="Prénom *"
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="lastName">
                          Nom *
                        </label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="lastName"
                                 className="form-control"
                                 placeholder="Nom *"
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="phoneNumber">
                          Téléphone *
                        </label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="phoneNumber"
                                 className="form-control"
                                 placeholder="Téléphone *"
                                 required="required"
                                 ref={register({ required: true })}>
                          </input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="zipCode">
                          Code Postal *
                        </label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="zipCode"
                                 className="form-control"
                                 placeholder="Code Postal *"
                                 required="required"
                                 ref={register({ required: true })}>
                          </input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="birthdate">
                          Date de naissance *
                        </label>
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
                        <label className="col-md-3 col-form-label" htmlFor="deStatus">
                          Niveau d'étude actuel *
                        </label>
                        <div className="col-md-9">
                          <select name="niveauEtude"
                                  className="form-control"
                                  placeholder="Niveau d'étude actuel *"
                                  required="required"
                                  ref={register({ required: true })}>
                            <option value="">Choisissez dans la liste</option>
                            {niveauxEtude.map((niveauEtude) =>
                              <option key={niveauEtude.id} value={niveauEtude.id}>{niveauEtude.label}</option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="deStatus">
                          Votre mot de passe *
                        </label>
                        <div className="col-md-9">
                          <input type="password"
                                 name="password"
                                 placeholder="Votre mot de passe *"
                                 className="form-control"
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="deStatus">
                          Confirmez votre mot de passe *
                        </label>
                        <div className="col-md-9">
                          <input type="password"
                                 name="confirmPassword"
                                 placeholder="Confirmez votre mot de passe *"
                                 className="form-control"
                                 required="required"
                                 ref={register({
                                   required: true,
                                   validate: value => value === getValues().password || 'Les mots de passe ne sont pas identiques'
                                 })}
                          />
                          {
                            errors.confirmPassword &&
                            <p className='invalid-feedback' style={{ display: 'block' }}>Les mots de passe ne sont pas identiques</p>
                          }
                        </div>
                      </div>
                      <div className="form-group row">
                        <button className="button large btn-xl button primary-bg btn-block"
                                type="submit"
                                disabled={isSubmitted}
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
                                }}
                        >VALIDER
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="shortcut-login">
                  <Link to="/candidats/login">
                    <p>Déjà enregistré ? <b>Se connecter</b></p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RegisterCandidat
