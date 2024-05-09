// import React from 'react'

import { NavLink } from "react-router-dom"

const ErrorPage = () => {
    return (
        <section className="container-fluid" >
            <div className="container d-flex" style={{height: '50vh'}}>
                <div className="content m-auto text-center">
                    <h2>404 Page Not Found</h2>
                    <NavLink className="btn btn-outline-primary mt-4" to='/'>
                        Go back to home
                    </NavLink>
                </div>
            </div>

        </section>
    )
}

export default ErrorPage
