/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"

const paymentContext = createContext();

const PaymentProvider = (props) => {
    const baseURL = import.meta.env.VITE_PAYMENT_BASE_URL;
    const [payments, setPayments] = useState([]);
    const [filterObj, setFilterObj] = useState({});
    const [loading, setLoading] = useState(false);

    const getRecieptPDF = async (e) => {
        try {
            setLoading(true);
            const url = `${baseURL}/receipt/${e.target.dataset.paymentid}`
            const response = await axios.get(url, {
                responseType: 'blob' // Set response type to 'blob' to receive binary data
            });
            const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(fileURL, '_blank');
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
        setLoading(false)
    }

    const clearFilters = () => {
        setFilterObj({});
        for (const property in Object.keys(filterObj)) {
            delete filterObj[property];
        }
        sendReq();
    }

    const sendReq = () => {
        let newUrl = `${baseURL}?`;
        let sortArr = [];

        console.log(filterObj)
        for (const [key, value] of Object.entries(filterObj)) {
            if (key === 'date' || key === 'amount' || key === 'unit') {
                console.log(key, value)
                sortArr.push(value);
            }
            else
                newUrl = `${newUrl}${key}=${value}&`;
        }
        if (newUrl.at(-1) === '&') {
            newUrl = newUrl.slice(0, -1);
        }

        if (sortArr.length > 0) var sort = `sort=${sortArr.join(",")}`;
        if (sort) newUrl = `${newUrl}&${sort}`;

        console.log(newUrl)
        fetchPayments(newUrl);
    }

    const fetchPayments = async (url) => {
        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res.data.payments);
        setPayments(res.data.payments);
    }

    const createPayment = async (userID, billNo) => {
        const res = await axios.post(baseURL, { userID, billNo }, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res.data.payment);
        return res.data.payment;
    }

    const fetchLastPayment = async (userID) => {
        const newUrl = `${baseURL}/${userID}`;
        console.log(newUrl);
        const res = await axios.get(newUrl, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res)
        if(res.response) throw res.error;
        else return res.data.payment;

    }

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            sendReq();
    }, [filterObj])

    return (
        <paymentContext.Provider value={{ payments, fetchPayments, createPayment, fetchLastPayment, getRecieptPDF, filterObj, sendReq, clearFilters, loading }}>
            {props.children}
        </paymentContext.Provider>
    )
}

const usePaymentContext = () => {
    return useContext(paymentContext);
}

export { PaymentProvider, usePaymentContext };