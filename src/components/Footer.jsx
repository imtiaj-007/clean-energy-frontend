import { NavLink } from 'react-router-dom'

import logo from '../assets/logo.svg'
import insta from '../assets/instagram.svg'
import fb from '../assets/fb.svg'
import linkedin from '../assets/linkedin.svg'
import twitter from '../assets/twitter.svg'

const Footer = () => {
    return (
        <section className="container-fluid footer bg-dark p-5" data-bs-theme="dark">
            <div className="container footer-container">
                <div className="row text-white">

                    <div className="footer-about col-5">
                        <figure>
                            <img className="brand-logo" src={logo} alt="logo" />
                        </figure>
                        <p>
                            We are committed to providing our customers with safe, reliable, and affordable electricity. We have been serving the community since 2020, and we are proud to be a part of the fabric of this town.
                        </p>
                        <p>+91 9082736458</p>
                        <div className="social-media-container ">
                            <a href="#" className="social-icons">
                                <img src={insta} alt="instagram-logo" />
                            </a>
                            <a href="#" className="social-icons">
                                <img src={fb} alt="fb-logo" />
                            </a>
                            <a href="#" className="social-icons">
                                <img src={linkedin} alt="linkedin-logo" />
                            </a>
                            <a href="#" className="social-icons">
                                <img src={twitter} alt="twitter-logo" />
                            </a>
                        </div>
                    </div>

                    <div className="col-7 pt-3">
                        <div className="row me-5">
                            <div className="col-sm ">
                                <div className="our-services d-flex ">
                                    <div className="m-auto">
                                        <h4>Our Services</h4>
                                        <ul>
                                            <li><p>Solar Energy</p></li>
                                            <li><p>Wind Energy</p></li>
                                            <li><p>Nuclear Energy</p></li>
                                            <li><p>Thermal Energy</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm ">
                                <div className="quick-access d-flex">
                                    <div className="m-auto">
                                        <h4>Quick Access</h4>
                                        <ul>
                                            <li><NavLink to="/" ><p>Home</p></NavLink></li>
                                            <li><NavLink to="/bills" ><p>Bills</p></NavLink></li>
                                            <li><NavLink to="/payments" ><p>Payments</p></NavLink></li>
                                            <li><NavLink to="/contact" ><p>Contact Us</p></NavLink></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr />
                        <div className="leagal-section">
                            <p>{`Copyright @ ${new Date().getFullYear()} CleanEnergy \u00A0\u00A0|\u00A0\u00A0 All rights reserved`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
