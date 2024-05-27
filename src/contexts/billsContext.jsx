/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
// import { pdf } from '@react-pdf/renderer'
// import BillPDF from "../components/BillPDF";

const BillsContext = createContext();

const BillsProvider = (props) => {
    const baseURL = import.meta.env.VITE_BILL_BASE_URL;
    const [bills, setBills] = useState([]);
    const [filterObj, setFilterObj] = useState({});
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);

    // const generatePDF = async (bill, user) => {
    //     const blob = await pdf(<BillPDF bill={bill} user={user} />).toBlob();
    //     return blob;
    // }

    const getBillPDF = async (billNo) => {
        try {
            setPdfLoading(true);
            const url = `${baseURL}/createBill/${billNo}`;

            const response = await axios.get(url, {
                responseType: 'blob'
            })
            console.log(response.data)

            // const response = await axios.get(url, {
            //     headers: {
            //         "Accept": 'application/json',
            //         "Content-Type": 'application/json'
            //     }
            // });

            // const data = await generatePDF(response.data.bill, response.data.user);
            const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(fileURL, '_blank');
            
        } catch (error) {
            console.log(error)
            throw error;
        }
        setPdfLoading(false)
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
        fetchBills(newUrl);
    }

    const getBillsByUserID = async (userID) => {
        setLoading(true)
        let newUrl = `${baseURL}/user/${userID}`;
        console.log(newUrl)
        const res = await axios.get(newUrl, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(res.data);
        const { bills, user } = res.data;
        setLoading(false)
        return { bills, user };
    }

    const getBillByID = async (billNo) => {
        let newUrl = `${baseURL}/${billNo}`;
        console.log(newUrl)
        const res = await axios.get(newUrl, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res;
    }

    const fetchBills = async (url) => {
        setLoading(true)
        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res.data.bills);
        setBills(res.data.bills);
        setLoading(false)
    }

    const createBill = async (billObj) => {
        let newUrl = `${baseURL}/createBill`;
        const res = await axios.post(newUrl, billObj, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        return res.data.newBill;
    }

    const updateBill = async (billObj) => {
        let newUrl = `${baseURL}/createBill`;
        console.log(billObj)
        const res = await axios.patch(newUrl, billObj, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        return res.data.newBill;
    }

    const deleteBill = async (billObj) => {
        let newUrl = `${baseURL}/createBill`;
        console.log(billObj)
        const res = await axios.delete(newUrl, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            },
            data: billObj
        });
        return res.data.newBill;
    }

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            sendReq()
    }, [filterObj])


    return (
        <BillsContext.Provider value={{ bills, sendReq, fetchBills, createBill, updateBill, deleteBill, getBillByID, getBillsByUserID, getBillPDF, filterObj, setFilterObj, clearFilters, loading, pdfLoading }}>
            {props.children}
        </BillsContext.Provider>
    )
}

const useBillsContext = () => {
    return useContext(BillsContext);
}

export { BillsProvider, useBillsContext };