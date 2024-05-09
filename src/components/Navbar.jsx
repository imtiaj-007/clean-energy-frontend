import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.svg"
import avatar from '../assets/avatar.svg'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = ()=> {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    <figure>
                        <img className="brand-logo" src={logo} alt="logo" />
                    </figure>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        {localStorage.getItem('isAdmin') === 'true' &&
                            <li className="nav-item mx-3">
                                <NavLink className="nav-link" to="/users">Users</NavLink>
                            </li>
                        }
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link" to="/bills">Bills</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link" to="/payments">Payments</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        {!localStorage.getItem('authToken') &&
                            <li className="nav-item mx-3">
                                <NavLink className="btn btn-outline-light " to="/login" style={{ border: "groove" }}>Login</NavLink>
                            </li>
                        }
                        {localStorage.getItem('authToken') &&
                            <li className="nav-item dropdown mx-3">
                                <img className="avatar-img nav-link dropdown-toggle " src={avatar} alt="avatar" role="button" data-bs-toggle="dropdown" aria-expanded="false" />
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </li>
                        }
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
