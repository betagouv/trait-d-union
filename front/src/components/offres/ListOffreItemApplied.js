import React, { Fragment } from 'react'

const ListOffreItemApplied = ({ offre }) => {

  return (
    <Fragment>
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
              <div className="deadline">
                Candidature déjà envoyée
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ListOffreItemApplied
