import React from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <header className="header-2">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="header-top">
              <div className="logo-area">
                <a href="index.html"><img src="images/logo-2.png" alt=""/></a>
              </div>
              <div className="header-top-toggler">
                <div className="header-top-toggler-button"/>
              </div>
              <div className="top-nav" style={{display: 'flex'}}>
                <div className="dropdown header-top-notification">
                  <a href="#" className="notification-button">Notification</a>
                  <div className="notification-card">
                    <div className="notification-head">
                      <span>Notifications</span>
                      <a href="#">Mark all as read</a>
                    </div>
                    <div className="notification-body">
                      <a href="home-2.html" className="notification-list">
                        <i className="fas fa-bolt"></i>
                        <p>Your Resume Updated!</p>
                        <span className="time">5 hours ago</span>
                      </a>
                      <a href="#" className="notification-list">
                        <i className="fas fa-arrow-circle-down"></i>
                        <p>Someone downloaded resume</p>
                        <span className="time">11 hours ago</span>
                      </a>
                      <a href="#" className="notification-list">
                        <i className="fas fa-check-square"></i>
                        <p>You applied for Project Manager <span>@homeland</span></p>
                        <span className="time">11 hours ago</span>
                      </a>
                      <a href="#" className="notification-list">
                        <i className="fas fa-user"></i>
                        <p>You changed password</p>
                        <span className="time">5 hours ago</span>
                      </a>
                      <a href="#" className="notification-list">
                        <i className="fas fa-arrow-circle-down"></i>
                        <p>Someone downloaded resume</p>
                        <span className="time">11 hours ago</span>
                      </a>
                    </div>
                    <div className="notification-footer">
                      <a href="#">See all notification</a>
                    </div>
                  </div>
                </div>
                <div className="dropdown header-top-account">
                  <a href="#" className="account-button">My Account</a>
                  <div className="account-card">
                    <div className="header-top-account-info">
                      <a href="#" className="account-thumb">
                        <img src="images/account/thumb-1.jpg" className="img-fluid" alt=""/>
                      </a>
                      <div className="account-body">
                        <h5><a href="#">Robert Chavez</a></h5>
                        <span className="mail">chavez@domain.com</span>
                      </div>
                    </div>
                    <ul className="account-item-list">
                      <li><a href="#"><span className="ti-user"></span>Account</a></li>
                      <li><a href="#"><span className="ti-settings"></span>Settings</a></li>
                      <li><a href="#"><span className="ti-power-off"></span>Log Out</a></li>
                    </ul>
                  </div>
                </div>
                <div className="dropdown bootstrap-select select-language fit-width"><select className="selectpicker select-language"
                                                                                             data-width="fit" tabIndex="-98">
                  <option data-content="<span class=&quot;flag-icon flag-icon-us&quot;></span> English">English</option>
                  <option data-content="<span class=&quot;flag-icon flag-icon-mx&quot;></span> Español">Español</option>
                </select>
                  <button type="button" className="btn dropdown-toggle btn-light" data-toggle="dropdown" role="button" title="English">
                    <div className="filter-option">
                      <div className="filter-option-inner">
                        <div className="filter-option-inner-inner"><span className="flag-icon flag-icon-us"></span> English</div>
                      </div>
                    </div>
                  </button>
                  <div className="dropdown-menu " role="combobox">
                    <div className="inner show" role="listbox" aria-expanded="false" tabIndex="-1">
                      <ul className="dropdown-menu inner show"></ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <nav className="navbar navbar-expand-lg cp-nav-2">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="menu-item active"><a title="Home" href="home-1.html">Home</a></li>
                  <li className="menu-item dropdown">
                    <a href="#" data-toggle="dropdown" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Jobs</a>
                    <ul className="dropdown-menu">
                      <li className="menu-item"><a href="job-listing.html">Job Listing</a></li>
                      <li className="menu-item"><a href="job-listing-with-map.html">Job Listing With Map</a></li>
                      <li className="menu-item"><a href="job-details.html">Job Details</a></li>
                    </ul>
                  </li>
                  <li className="menu-item dropdown">
                    <a title="" href="#" data-toggle="dropdown" className="dropdown-toggle" aria-haspopup="true"
                       aria-expanded="false">Candidates</a>
                    <ul className="dropdown-menu">
                      <li className="menu-item"><a href="candidate.html">Candidate Listing</a></li>
                      <li className="menu-item"><a href="candidate-details.html">Candidate Details</a></li>
                      <li className="menu-item"><a href="add-resume.html">Add Resume</a></li>
                    </ul>
                  </li>
                  <li className="menu-item dropdown">
                    <a title="" href="#" data-toggle="dropdown" className="dropdown-toggle" aria-haspopup="true"
                       aria-expanded="false">Employers</a>
                    <ul className="dropdown-menu">
                      <li className="menu-item"><a href="employer-listing.html">Employer Listing</a></li>
                      <li className="menu-item"><a href="employer-details.html">Employer Details</a></li>
                      <li className="menu-item"><a href="employer-dashboard-post-job.html">Post a Job</a></li>
                    </ul>
                  </li>
                  <li className="menu-item dropdown">
                    <a href="#" data-toggle="dropdown" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Dashboard</a>
                    <ul className="dropdown-menu">
                      <li className="menu-item dropdown">
                        <a href="#" data-toggle="dropdown" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Candidate
                          Dashboard</a>
                        <ul className="dropdown-menu">
                          <li className="menu-item"><a href="dashboard.html">Dashboard</a></li>
                          <li className="menu-item"><a href="dashboard-edit-profile.html">Edit Profile</a></li>
                          <li className="menu-item"><a href="add-resume.html">Add Resume</a></li>
                          <li className="menu-item"><a href="resume.html">Resume</a></li>
                          <li className="menu-item"><a href="edit-resume.html">Edit Resume</a></li>
                          <li className="menu-item"><a href="dashboard-bookmark.html">Bookmarked</a></li>
                          <li className="menu-item"><a href="dashboard-applied.html">Applied</a></li>
                          <li className="menu-item"><a href="dashboard-pricing.html">Pricing</a></li>
                          <li className="menu-item"><a href="dashboard-message.html">Message</a></li>
                          <li className="menu-item"><a href="dashboard-alert.html">Alert</a></li>
                        </ul>
                      </li>
                      <li className="menu-item dropdown">
                        <a href="#" data-toggle="dropdown" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Employer
                          Dashboard</a>
                        <ul className="dropdown-menu">
                          <li className="menu-item"><a href="employer-dashboard.html">Employer Dashboard</a></li>
                          <li className="menu-item"><a href="employer-dashboard-edit-profile.html">Edit Profile</a></li>
                          <li className="menu-item"><a href="employer-dashboard-manage-candidate.html">Manage Candidate</a></li>
                          <li className="menu-item"><a href="employer-dashboard-manage-job.html">Manage Job</a></li>
                          <li className="menu-item"><a href="employer-dashboard-message.html">Dashboard Message</a></li>
                          <li className="menu-item"><a href="employer-dashboard-pricing.html">Dashboard Pricing</a></li>
                          <li className="menu-item"><a href="employer-dashboard-post-job.html">Post Job</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item dropdown">
                    <a title="" href="#" data-toggle="dropdown" className="dropdown-toggle" aria-haspopup="true"
                       aria-expanded="false">Pages</a>
                    <ul className="dropdown-menu">
                      <li className="menu-item"><a href="about-us.html">About Us</a></li>
                      <li className="menu-item"><a href="how-it-work.html">How It Works</a></li>
                      <li className="menu-item"><a href="pricing.html">Pricing Plan</a></li>
                      <li className="menu-item"><a href="faq.html">FAQ</a></li>
                      <li className="menu-item dropdown">
                        <a href="#" data-toggle="dropdown" className="dropdown-toggle" aria-haspopup="true"
                           aria-expanded="false">News &amp; Advices</a>
                        <ul className="dropdown-menu">
                          <li className="menu-item"><a href="blog.html">News</a></li>
                          <li className="menu-item"><a href="blog-grid.html">News Grid</a></li>
                          <li className="menu-item"><a href="blog-details.html">News Details</a></li>
                        </ul>
                      </li>
                      <li className="menu-item"><a href="checkout.html">Checkout</a></li>
                      <li className="menu-item"><a href="payment-complete.html">Payment Complete</a></li>
                      <li className="menu-item"><a href="invoice.html">Invoice</a></li>
                      <li className="menu-item"><a href="terms-and-condition.html">Terms And Condition</a></li>
                      <li className="menu-item"><a href="404.html">404 Page</a></li>
                      <li className="menu-item"><a href="login.html">Login</a></li>
                      <li className="menu-item"><a href="register.html">Register</a></li>
                    </ul>
                  </li>
                  <li className="menu-item"><a href="contact.html">Contact Us</a></li>
                  <li className="menu-item post-job">
                    <Link to="/poster-offre">
                      <i className="fas fa-plus"></i>
                      Poster une offre d'immersion (PMSMP)
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
