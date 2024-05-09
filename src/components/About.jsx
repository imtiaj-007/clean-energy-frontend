// import React from 'react'

const About = () => {
    return (
        <section className="about container-fluid">
            <div className="container text-center py-5">
                <h2 className="mb-5">About Us</h2>
                <p>{`We are among the largest Independent Power Producers of Renewable Power in India. As of ${new Date().getFullYear()}, we have a portfolio of 402.3 MW of wind assets spread across the states of West Bengal, Tamil Nadu, Andra Pradesh, Gujarat, Karnataka. The above also includes a 10.5 MW wind farm in Croatia, Europe.`}</p>
                <p>The main business is distribution and hydro generation of electricity. It is also the nodal Agency of the Government of West Bengal for undertaking Rural Electrification task in the State with objective of providing access of electricity to all rural households in the state in line with the National Rural Electrification Policy.

                The Company is managed by a Board of Directors comprising twelve members out of which seven are Executive Directors including Chairman & Managing Director. Besides one Woman Director and four Independent Directors constitute the Board.</p>
            </div>
        </section>
    )
}

export default About
