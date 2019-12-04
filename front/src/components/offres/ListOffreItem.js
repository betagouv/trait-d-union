import React from 'react'
import { Link } from 'react-router-dom'

const ListOffreItem = ({ offre }) => {

  return (
    <div className="job-list">
      <div className="thumb">
        <img src={offre.imageURL} className="img-fluid" alt=""/>
      </div>
      <div className="body">
        <div className="content">
          <h4>{offre.jobTitle}</h4>
          <span className="office-location"><i data-feather="map-pin"/>{offre.address}</span>
        </div>
        <div className="more">
          <div className="buttons">
            <Link to={{
              pathname: `/offres/candidature`,
              search: `?offreId=${offre.id}`,
              state: { offre }
            }}>
              <button className="button">Essayer</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListOffreItem
