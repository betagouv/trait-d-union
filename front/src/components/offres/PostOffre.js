import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import useForm from 'react-hook-form'
import client from '../../utils/rest-module'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { StringParam, useQueryParam } from 'use-query-params'

const Alert = withReactContent(Swal)

const PostOffre = () => {
  const [isSubmitted] = useState(false)
  const { register, handleSubmit, reset, setValue } = useForm()
  const prefilledValues = useQueryValues(useQueryParam)

  useEffect(() => {
    setValue('jobTitle', prefilledValues.jobTitle)
    setValue('email', prefilledValues.email)
    setValue('address', prefilledValues.address)
    setValue('codeROME', prefilledValues.codeROME)
    setValue('companyName', prefilledValues.companyName)
  }, [prefilledValues.jobTitle, prefilledValues.email, prefilledValues.address,
    prefilledValues.companyName, prefilledValues.codeROME, setValue])

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
                      <div className="form-group row" hidden={true}>
                        <label className="col-md-3 col-form-label">Code ROME ?</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="codeROME"
                                 className="form-control"
                                 placeholder="Exemple : 57100"
                                 ref={register({ required: false })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Nom de l'entreprise ?</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="companyName"
                                 className="form-control"
                                 placeholder="Exemple : entreprise SAS"
                                 required="required"
                                 ref={register({ required: true })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label">Département et ville de l'immersion ?</label>
                        <div className="col-md-9">
                          <input type="text"
                                 name="address"
                                 className="form-control"
                                 placeholder="Exemple : 57 - Metz"
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
                        <button className="button"
                                disabled={isSubmitted}
                                type="submit">Poster votre offre
                        </button>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label"/>
                      <div className="col-md-9">
                        <p>Ça ne vous engage à rien, seulement à recevoir par email des candidatures. Vos coordonnées ne seront pas
                          diffusées. Vous pourrez retirer votre offre à tout moment ensuite.</p>
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

function useQueryValues (useQueryParam) {
  const [jobTitle] = useQueryParam('jobTitle', StringParam)
  const [address] = useQueryParam('address', StringParam)
  const [email] = useQueryParam('email', StringParam)
  const [companyName] = useQueryParam('company_name', StringParam)
  const [codeROME] = useQueryParam('code_rome', StringParam)

  return {
    jobTitle,
    address,
    email,
    companyName,
    codeROME
  }
}

export default PostOffre
