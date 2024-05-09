/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"

const paymentContext = createContext();

const PaymentProvider = (props) => {
    const baseURL = "http://localhost:5000/api/payments"
    const [payments, setPayments] = useState([])

    const fetchPayments = async() => {
        const res = await axios.get(baseURL, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res.data.payments);
        setPayments(res.data.payments);
    }

    const createPayment = async(userID, billNo) => {
        const res = await axios.post(baseURL, {userID, billNo}, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res.data.payment);
        return res.data.payment;
    }

    const fetchLastPayment = async(userID) => {
        const newUrl = `${baseURL}/${userID}`;
        console.log(newUrl);
        const res = await axios.get(newUrl, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res.data.payment);
        return res.data.payment;
    }

    useEffect(() => {
        fetchPayments();
    }, [])

    return (
        <paymentContext.Provider value={{ payments, fetchPayments, createPayment, fetchLastPayment }}>
            {props.children}
        </paymentContext.Provider>
    )
}

const usePaymentContext = () => {
    return useContext(paymentContext);
}

export { PaymentProvider, usePaymentContext };