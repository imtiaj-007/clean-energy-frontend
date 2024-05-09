import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { BillsProvider } from './contexts/billsContext.jsx'
import { UserProvider } from './contexts/userContext.jsx'
import { PaymentProvider } from './contexts/paymentContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <BillsProvider>
                <PaymentProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </PaymentProvider>
            </BillsProvider>
        </UserProvider>
    </React.StrictMode>,
)
