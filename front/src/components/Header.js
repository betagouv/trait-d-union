import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header className="header-2">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="header-top">
                            <div className="logo-area">
                                <Link to="/">
                                    <img src="/logo.png" alt="logo région grand est " />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header
