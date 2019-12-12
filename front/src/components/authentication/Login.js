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
  const { login, redirectUrl } = useAuth()
  const { register, handleSubmit } = useForm()

  const onSubmit = async formData => {
    try {
      const user = await login(formData.email, formData.password)
      await Alert.fire({
        icon: 'success',
        title: `Content de vous revoir ${user.firstName} ${user.lastName} !`,
        confirmButtonText: 'Ok',
        onClose: () => router.push(redirectUrl)

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
      <div className="padding-top-60 padding-bottom-60 ">
        <div className="container">
          <div className="row">
          <div className="col-xl-6 col-md-6 ">
              <div className="access-form">
                <div className="form-header">
                  <h3>Pas encore de compte? Inscrivez-vous</h3>
                </div>

                <div style={{height: '50px', marginBottom: '30px'}}>
                  <p>✅ Accédez à 200 métiers à essayer à côté de chez vous : ils recrutent tous.  </p>
                </div>

                <div style={{height: '50px',marginBottom: '30px'}} >
                  <p>✅ Une formation gratuite est proposée si besoin pour les demandeurs d'emploi et les jeunes.</p>
                </div>


                <div style={{height: '50px',marginBottom: '30px'}} >
                  <p>✅ Ce service est gratuit et fourni par la Région Grand Est. </p>
                </div>

                <div className="form-group" >

                  <Link to="/candidats/register"
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
                    👉 INSCRIPTION RAPIDE
                </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-6">
              <div className="access-form">
                <div className="form-header">
                  <h3>Déjà un compte? Connectez-vous</h3>
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
                      autoComplete="current-password"
                           ref={register({ required: true })}
                    />
                  </div>

                  <div className="form-group" style={{height: '50px', marginBottom: '30px'}} >
                  <p> <a href="#">Mot de passe oublié ?</a></p>
                </div>
                  <div className="form-group row">
                    <button cclassName="button large btn-xl"
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
                      type="submit"
                      disabled={isSubmitted}>SE CONNECTER
                    </button>
                  </div>

                </form>
              </div>
            </div>


          </div>


        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
