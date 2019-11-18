import React from 'react'
import { Link } from 'react-router-dom'

class Breadcrumb extends React.Component {
  render () {
    return (
      <div className="alice-bg padding-top-70 padding-bottom-70">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="breadcrumb-area">
                <h1>{this.props.title}</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        Accueil
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{this.props.pageDescription}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Breadcrumb
