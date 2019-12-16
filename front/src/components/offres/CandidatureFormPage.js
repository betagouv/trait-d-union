import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { StringParam, useQueryParam } from 'use-query-params'
import { useRequireAuth } from '../../use-require-auth.js'
import CandidatureForm from './CandidatureForm'
import Header from '../Header'
import client from '../../utils/rest-module'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from '../../use-router'

const Alert = withReactContent(Swal)

const CandidatureFormPage = () => {
  const router = useRouter()
  const location = useLocation()
  const [offre, setOffre] = useState(location.state && location.state.offre)
  const [offreId] = useQueryParam('offreId', StringParam)
  const auth = useRequireAuth(`/offres/candidature?offreId=${offreId}`)

  useEffect(() => {
    async function fetchOffre () {
      try {
        console.log(offreId)
        const { data } = await client.get(`/offres/${offreId}`)
        setOffre(data)
      } catch (e) {
        throw e
      }
    }

    if (!offre) {
      redirectToOffresListIfOffreIsNotValid(router, fetchOffre)
    }
  })

  if (!auth.user) {
    console.log('not Authenticated')
    return <div>Chargement...</div>
  }

  if (!offre) {
    return (
      <div>Récupération de l'offre en cours...</div>
    )
  }

  return (
    <React.Fragment>
      <header>
        <Header homeLink='/candidats'/>
      </header>
      <CandidatureForm offre={offre}/>
    </React.Fragment>
  )
}

function redirectToOffresListIfOffreIsNotValid (router, fetchOffre) {
  fetchOffre().catch(() => {
    Alert.fire({
      icon: 'error',
      title: 'Cette offre n\'est plus disponible. Vous allez être redirigé vers la liste des offres.',
      confirmButtonText: 'OK',
      onClose: () => router.push('/offres'),
      footer: '<a href="mailto:contact@traitdunion.beta.gouv.fr">Nous contacter</a>'
    })
  })
}

export default CandidatureFormPage

