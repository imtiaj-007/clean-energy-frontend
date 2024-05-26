/* eslint-disable react/no-unescaped-entities */
// import React from 'react'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Toast from '../components/Toast'

import insta from '../assets/instagram.svg'
import linkedin from '../assets/linkedin.svg'
import twitter from '../assets/twitter.svg'
import github from '../assets/github.svg'
import send from '../assets/send.svg'


const Contact = () => {
    const serviceID = import.meta.env.VITE_CONTACT_SERVICE;
    const serviceTemplate = import.meta.env.VITE_CONTACT_FORM;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
    const [toast, setToast] = useState({ mode: '', message: '', show: false });

    const showToast = (mode, message)=> {
        setToast({ mode, message, show: true });
    }

    const hideToast = ()=> {
        setToast(prevState => ({ ...prevState, show: false }));
    }

    const sendMessage = (e) => {
        e.preventDefault();
        showToast('Loading', '');

        const user_name = document.getElementById("nameInput").value;
        const user_email = document.getElementById("emailInput").value;
        const message = document.getElementById("messageInput").value;
        
        const data = {
            user_name,
            user_email,
            message
        }
        
        emailjs
        .send(serviceID, serviceTemplate, data, {
            publicKey: PUBLIC_KEY,
        })
        .then(
            () => {
                console.log('SUCCESS!');
                showToast('Success', 'Mail sent successfully !')
            },
            (error) => {
                console.log('FAILED...', error.text);
                setToast('Error', 'Please try again later...')
            },
        );
        
        document.getElementById("contactForm").reset();
    }

    return (
        <section className="container contacts">
            <div className="row my-3 ">

                <div className="col-md-12 col-lg-7 ">
                    <section className="about-me container d-flex outer-border px-sm-3 px-lg-5 mb-3">
                        <div className="m-auto">
                            <h4 className="my-4">
                                About Me
                            </h4>
                            <p>
                                Hello and thank you for visiting my electricity bill management system Clean Energy! <br />
                                I'm <strong>SK IMTIAJ UDDIN</strong>, final year undergraduate student, currently pursuing B.Tech in Information Technology, from Budge
                                Budge Institute of Technology, Kolkata. <br />
                                I'm showcasing my skills in Web Development by creating this platform for learning and demonstration purpose only.
                            </p>

                            <ul className="my-4">
                                <li>
                                    The Electricity Bill Management System is created using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js.
                                </li>
                                <li>
                                    This system manages the electricity billing by providing a seamless interface for users to view, pay, and track their electricity consumption and bills.
                                </li>
                                <li>
                                    The backend, powered by Node.js and Express.js, ensures secure and efficient handling of data, while MongoDB stores user, billing and payment information.
                                </li>
                                <li>
                                    The React.js frontend delivers a dynamic and responsive user experience, making it easy for users to interact with the system. This comprehensive solution not only simplifies the billing process but also supports sustainable energy management practices.
                                </li>
                            </ul>

                            <p className="my-5">
                                Thank you for taking the time to learn more about me. I'm always excited to connect with fellow developers, collaborate on innovative projects, and share knowledge within the community. If you'd like to get in touch, feel free to reach out through my LinkedIn, GitHub, or personal website. Let's build something amazing together!
                            </p>
                        </div>
                    </section>
                </div>

                <div className="col-md-12 col-lg-5 text-center mt-md-3 mt-lg-0 ">

                        <div className="container d-flex outer-border ">
                            <div className="m-auto">
                                <h4 className="my-4 ">
                                    Other Projects
                                </h4>
                                <div className="projects ">
                                    <a className="btn btn-project" href="https://music-player-clone.infinityfreeapp.com" target="_blank" rel="noopener noreferrer">Music Player <br /> 'Elevate your sound experience'</a>
                                    <a className="btn btn-project" href="https://news-desk.netlify.app" target="_blank" rel="noopener noreferrer">News Desk <br /> 'Bringing you the latest Headlines'</a>
                                    <a className="btn btn-project" href="https://sk-imtiaj-uddin-portfolio.netlify.com" target="_blank" rel="noopener noreferrer">My Portfolio <br /> 'Crafted for the Modern Era'</a>
                                </div>
                            </div>
                        </div>                    
                    
                        <div className="container d-flex outer-border mt-3 bg-dark text-white ">
                            <div className="m-auto">

                                <form className='mt-4' id='contactForm' onSubmit={sendMessage}>
                                    <fieldset className="border rounded">
                                        <legend className="float-none">Leave a Message</legend>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="nameInput" placeholder="Your Name" required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" className="form-control" id="emailInput" placeholder="email@example.com" required />
                                        </div>
                                        <div className="mb-3">
                                            <textarea className="form-control" id="messageInput" rows="3" required></textarea>
                                        </div>
                                        <div>
                                            <button className="btn btn-danger text-white" type="submit" style={{ width: "10rem" }}>
                                                <span className='me-2'>Send</span>
                                                <i><img src={send} alt='send-button' /></i>
                                            </button>
                                        </div>
                                    </fieldset>
                                </form>

                                <h4 className="my-4">
                                    Let's Connect
                                </h4>
                                <div className="d-flex">
                                    <div className="social-media-container m-auto mb-4">
                                        <a href="https://www.instagram.com/soul.survivor_27" className="social-icons" target="_blank" rel="noopener noreferrer" >
                                            <img src={insta} alt="instagram-logo" />
                                        </a>
                                        <a href="https://github.com/imtiaj-007" className="social-icons" target="_blank" rel="noopener noreferrer" >
                                            <img src={github} alt="fb-logo" />
                                        </a>
                                        <a href="https://www.linkedin.com/in/sk-imtiaj-uddin-b26432254" className="social-icons" target="_blank" rel="noopener noreferrer" >
                                            <img src={linkedin} alt="linkedin-logo" />
                                        </a>
                                        <a href="https://x.com/imtiaj_007" className="social-icons" target="_blank" rel="noopener noreferrer" >
                                            <img src={twitter} alt="twitter-logo" />
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>                                        

                </div>

            </div>
            {toast.show && <Toast mode={toast.mode} message={toast.message} onClose={hideToast} />}
        </section>

    )
}

export default Contact
