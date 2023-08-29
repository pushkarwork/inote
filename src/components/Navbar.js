import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
function Navbar() {
    let navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        // console.log(location.pathname)


    }, [location])
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")

    }

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-secondary ">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""} `} to="/About">About</Link>
                                </li> */}
                               
                            </ul>
                            {!localStorage.getItem("token") ?
                                <div className="d-flex " >
                                    <Link className="btn btn-outline-primary mx-2 " to="/login">Login</Link>
                                    <Link className="btn btn-outline-success" to="/signup">Sign Up</Link>
                                </div> :
                                <button type="button" onClick={handleLogout} className="btn btn-outline-success">Logout</button>
                            }

                        </div>
                    </div>
                </nav >
            </div >
        </>
    )
}

export default Navbar
