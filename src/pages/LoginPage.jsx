/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Toast from '../components/Toast'
import loginImg from '../assets/login.jpg'


const LoginPage = () => {
    const Navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({})
    const [showLoginForm, setshowLoginForm] = useState(true)

    const toogleLogin = (e) => {
        e.preventDefault()
        setshowLoginForm(!showLoginForm)
        console.log(showLoginForm)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(userDetails)

        const res = await axios.post('http://localhost:5000/api/users/login', userDetails, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const token = res.data.authToken

        if (token) {
            localStorage.setItem('authToken', res.data.authToken)
            localStorage.setItem('isAdmin', res.data.isAdmin)
            
            if(localStorage.getItem('isAdmin') === 'true')
                Navigate('/users')
            else
                Navigate('/bills')
            window.location.reload()
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        console.log(userDetails)
            
        const res = await axios.post('http://localhost:5000/api/users/signup', userDetails, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const token = res.data.authToken

        if (token) {
            localStorage.setItem('authToken', res.data.authToken)
            localStorage.setItem('isAdmin', res.data.isAdmin)
            Navigate('/bills')
            window.location.reload()
        }
    }

    return (
        <section className="container-fluid login-page mt-5">
            <div className="container d-flex">
                <div className="main-container row m-auto shadow">
                    <div className="img-section col-md-12 col-lg-6 d-flex">
                        <img src={loginImg} alt="login" />
                    </div>
                    <div className="form-section col-md-12 col-lg-6">
                        <div className="form-container">
                            <div className="form-heading mb-4">

                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={showLoginForm} />
                                    <label className="btn btn-outline-light " htmlFor="btnradio1" onClick={toogleLogin}><h4>Login</h4></label>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={!showLoginForm} />
                                    <label className="btn btn-outline-light " htmlFor="btnradio2" onClick={toogleLogin}><h4>SignUp</h4></label>
                                </div>
                            </div>

                            {showLoginForm &&
                                <form action="#" method="post" className="text-white" onSubmit={handleLogin}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} placeholder="example@gmail.com" required />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password"
                                            onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} className="form-control" required />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <NavLink to="#" style={{ textDecoration: "underline" }}>Forget Password</NavLink>
                                        <button className="btn btn-outline-light" type="submit">Login</button>
                                    </div>
                                    <hr />
                                    <p className="text-center">Don't have an account ? <NavLink to="#" style={{ textDecoration: "underline" }} onClick={toogleLogin}>Signup</NavLink></p>
                                </form>}

                            {!showLoginForm &&
                                <form action="#" method="post" className="text-white" onSubmit={handleSignup}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="fullname">Full Name</label>
                                        <input type="text" name="customerName" id="fullname"
                                            onChange={(e) => setUserDetails({...userDetails, customerName: e.target.value})} className="form-control" placeholder="SK Imtiaj Uddin" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className="form-control"
                                            onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} placeholder="example@gmail.com" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password"
                                            onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} className="form-control" required />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center  ">
                                        <NavLink to="#" style={{ textDecoration: "underline" }}>Forget Password</NavLink>
                                        <button className="btn btn-outline-light" type="submit" >Signup</button>
                                    </div>
                                    <hr />
                                    <p className="text-center">Already have an account ? <NavLink to="#" style={{ textDecoration: "underline" }} onClick={toogleLogin}>Login</NavLink></p>
                                </form>}
                        </div>
                    </div>
                </div>
            </div>
            <Toast mode={'Tips'}/>
        </section>
    )
}

export default LoginPage
