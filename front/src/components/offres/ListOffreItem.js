import React from 'react'

class ListOffreItem extends React.Component {
  render () {
    console.log(this.props.offre)
    return (
      <div className="job-list">
        <div className="thumb">
          <img src={this.props.offre.imageURL} className="img-fluid" alt=""/>
        </div>
        <div className="body">
          <div className="content">
            <h4><a href="job-details.html">{this.props.offre.jobTitle}</a></h4>
            <div className="info">
              <span className="office-location"><a href="#"><i data-feather="map-pin"/>{this.props.offre.address}</a></span>
            </div>
          </div>
          <div className="more">
            <div className="buttons">
              <a href="#" className="button" data-toggle="modal" data-target="#apply-popup-id">Postuler</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListOffreItem
