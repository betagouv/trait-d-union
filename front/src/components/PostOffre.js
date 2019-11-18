import React from 'react'
import Breadcrumb from './common/Breadcrumb'
import useForm from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Alert = withReactContent(Swal)

const PostOffre = () => {
  const { register, handleSubmit, errors, reset } = useForm()
  const onSubmit = async formData => {
    try {
      await axios.post('/api/v1/offres', formData)
      await Alert.fire({
        icon: 'success',
        title: 'Félicitations ! Votre offre a bien été créée et va être diffusée largement !',
        confirmButtonText: 'Poster une nouvelle offre'
      })
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
  console.log(errors)

  return (
    <React.Fragment>
      <Breadcrumb title="Poster une offre" pageDescription="Poster une offre d'immersion (PMSMP)"/>
      <div className="alice-bg section-padding-bottom">
        <div className="container no-gliters">
          <div className="row no-gliters">
            <div className="col">
              <div className="dashboard-container">
                <div className="dashboard-content-wrapper">
                  <form onSubmit={handleSubmit(onSubmit)} className="dashboard-form job-post-form">
                    <div className="dashboard-section basic-info-input">
                      <h4>
                        Faire découvrir un métier grâce à une offre d'immersion (PMSMP)
                      </h4>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Quel métier souhaitez-vous faire découvrir ?</label>
                        <div className="col-md-9">
                          <input autoFocus
                                 type="text"
                                 name="jobTitle"
                                 className="form-control"
                                 placeholder="Intitulé du métier que vous souhaitez faire découvrir"
                                 required="required"
                                 ref={register({ required: 'Ce champ est obligatoire' })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Où se trouve l'immersion ?</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="address"
                                 className="form-control"
                                 placeholder="Lieu de l'immersion (Code Postal a minima)"
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">À quelle adresse email pouvons-nous vous joindre ?</label>
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
