import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '../../use-auth'
import { useRouter } from '../../use-router'

const Alert = withReactContent(Swal)

const Login = () => {
  const [isSubmitted] = useState(false)
  const router = useRouter();
  const { login } = useAuth()
  const { register, handleSubmit } = useForm()

  const onSubmit = async formData => {
    try {
      const user = await login(formData.email, formData.password)
      await Alert.fire({
        icon: 'success',
        title: `Content de vous revoir ${user.email} !`,
        confirmButtonText: 'Ok',
        onClose: () => router.push('/offres')

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
                  <h5><i data-feather="user"/>Se connecter</h5>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input autoFocus
                           type="email"
                           name="email"
                           placeholder="Votre adresse email"
                           className="form-control"
                           required="required"
                           ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    />
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
                  <a href="#">Mot de passe oublié ?</a>
                  <div className="form-group row">

                    <button className="button primary-bg btn-block"
                            type="submit"
                            disabled={isSubmitted}>Se connecter
                    </button>
                  </div>
                </form>
                <div className="shortcut-login">
                  <Link to='/candidats/register'>
                  <p>Pas encore de compte ? S'enregistrer</p>
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

export default Login
