import React from 'react'
import Breadcrumb from '../common/Breadcrumb'
import useForm from 'react-hook-form'
import client from '../../utils/rest-module'
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
                          <input autoFocus
                                 type="text"
                                 name="jobTitle"
                                 className="form-control"
                                 placeholder="Exemple : coiffeur, serveur, astronaute"
                                 required="required"
                                 ref={register({ required: 'Ce champ est obligatoire' })}
                          />
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
