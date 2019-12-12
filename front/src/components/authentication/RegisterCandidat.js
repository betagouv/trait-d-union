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
      <div className="padding-top-90 padding-bottom-90 access-page-bg">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="access-form">
                <div className="form-header">
                  <h5><i data-feather="user"/>Créer un compte</h5>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input autoFocus
                           type="email"
                           name="email"
                           placeholder="Votre adresse email *"
                           className="form-control"
                           required="required"
                           ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    />
                  </div>
                  <div className="form-group">
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
                  </div>
                  <div className="form-group">
                    <input type="text"
                           name="firstName"
                           className="form-control"
                           placeholder="Prénom *"
                           required="required"
                           ref={register({ required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <input type="text"
                           name="lastName"
                           className="form-control"
                           placeholder="Nom *"
                           required="required"
                           ref={register({ required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <input type="text"
                           name="phoneNumber"
                           className="form-control"
                           placeholder="Téléphone *"
                           required="required"
                           ref={register({ required: true })}>
                    </input>
                  </div>
                  <div className="form-group">
                    <input type="text"
                           name="zipCode"
                           className="form-control"
                           placeholder="Code Postal *"
                           required="required"
                           ref={register({ required: true })}>
                    </input>
                  </div>
                  <div className="form-group">
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
                  <div className="form-group">
                    <select name="niveauEtude"
                            className="form-control"
                            placeholder="Niveau d'étude actuel *"
                            required="required"
                            ref={register({ required: true })}>
                      <option defaultValue disabled>Niveau d'étude actuel *</option>
                      {niveauxEtude.map((niveauEtude) =>
                        <option key={niveauEtude.id} value={niveauEtude.id}>{niveauEtude.label}</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="password"
                           name="password"
                           placeholder="Votre mot de passe"
                           className="form-control"
                           required="required"
                           ref={register({ required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <input type="password"
                           name="confirmPassword"
                           placeholder="Confirmez votre mot de passe"
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
                  <div className="form-group row">

                    <button className="button primary-bg btn-block"
                            type="submit"
                            disabled={isSubmitted}>Créer un compte
                    </button>
                  </div>
                </form>
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
