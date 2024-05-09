import { Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './pages/Home'
import Contact from './pages/Contact'
import ErrorPage from './pages/ErrorPage'
import Navbar from './components/Navbar'
import Bills from './pages/Bills'
import Payments from './pages/Payments'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Users from './pages/Users'

function App() {

  return (
      <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </>
  )
}

export default App
