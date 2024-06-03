/* eslint-disable react/prop-types */
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react";
import jsPDF from "jspdf"
import "jspdf-autotable"

const paymentContext = createContext();

const PaymentProvider = (props) => {
    const baseURL = import.meta.env.VITE_PAYMENT_BASE_URL;
    const [payments, setPayments] = useState([]);
    const [filterObj, setFilterObj] = useState({});
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);

    const genPDF = (pdfReceipt) => {
        let pdf = new jsPDF('portrait', 'px');
        pdf.setProperties({
            title: 'Receipt PDF',
            author: 'SK Imtiaj Uddin',
            date: new Date().toISOString().slice(0, 10)
        })

        const logo = '/logo.png';
        pdf.addImage(logo, 'JPEG', 30, 45, 80, 36);

        pdf.setLineWidth(2.5);
        pdf.setDrawColor(0, 0, 0);
        pdf.line(30, 80, 410, 80);

        pdf.autoTable({
            theme: 'plain',
            tableWidth: 340,
            startY: 100,
            head: [['Payment Receipt']],
            headStyles: {
                fontSize: 12,
                fillColor: [0, 80, 255],
                textColor: [255, 255, 255],
                halign: 'center'
            },
            margin: { top: 20, left: 53 },
        });

        let paymentDate = pdfReceipt.createdAt.substr(0, 10)
        let table = [
            ['Transaction No.', pdfReceipt._id],
            ['Customer ID', pdfReceipt.userID],
            ['Bill Number', pdfReceipt.billNo],            
            ['Payment Amount', pdfReceipt.amount],
            ['Payment Method', pdfReceipt.method],
            ['Payment Date', paymentDate]
        ];
            

        pdf.autoTable({
            theme: 'grid',
            tableWidth: 340,
            startY: 130,
            body: table,
            bodyStyles: {
                fontSize: 11,
                fontSytle: 'bold',
                textColor: 0,
                cellPadding: { top: 5, left: 25, bottom: 5 }
            },
            margin: { top: 20, left: 53 },
            alternateRowStyles: { fillColor: [247, 247, 247] },
        });

        pdf.autoTable({
            theme: 'grid',
            tableWidth: 340,
            startY: 280,
            head: [['Acknowledgement']],
            headStyles: {
                fontSize: 14,
                fontSytle: 'bold',
                halign: 'center',
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0]
            },
            body: [[
                `Thank you for your payment! Your contribution helps us maintain reliable electricity services and supports our commitment to sustainable energy practices.\nWe appreciate your continued partnership in building a greener future. For any inquiries or assistance, please don't hesitate to contact us.\n\n\t\t\t\t\t\tHave a wonderful day!`
            ]],
            bodyStyles: {
                fontSize: 11,
                textColor: [48, 48, 48],
                cellPadding: 12,
                lineWidth: 2
            },
            margin: { top: 20, left: 53 }
        })

        pdf.autoTable({
            theme: 'grid',
            tableWidth: 340,
            startY: 400,
            head: [['About Me']],
            headStyles: {
                fontSize: 14,
                fontSytle: 'bold',
                halign: 'center',
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0]
            },
            body: [[
                `Hello and thank you for visiting my Electricity Bill Management System Clean Energy! \nI'm SK IMTIAJ UDDIN, pre-final year undergraduate student, currently pursuing B.Tech in Information Technology, from Budge Budge Institute of Technology, Kolkata. \nI'm showcasing my skills in Web Development by creating this platform for learning and demonstration purpose only. Dive into the features, enjoy this Full Stack project and experience the beauty of MERN Stack Application, and feel free to navigate through various sections.`
            ]],
            bodyStyles: {
                fontSize: 11,
                textColor: [48, 48, 48],
                cellPadding: 12,
                lineWidth: 2
            },
            margin: { top: 20, left: 53 }
        })        

        pdf.save(`${pdfReceipt._id}.pdf`);
    }

    const getRecieptPDF = async (paymentID) => {
        try {
            setPdfLoading(true);
            const url = `${baseURL}/receipt/${paymentID}`
            const response = await axios.get(url, {
                'Content-Type': 'application/json'
            })
            console.log(response)                        
            genPDF(response.data.receipt)
            
        } catch (error) {
            console.error('Error downloading PDF:', error);
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
        fetchPayments(newUrl);
    }

    const fetchPayments = async (url) => {
        setLoading(true)
        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res.data.payments);
        setPayments(res.data.payments);
        setLoading(false);
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
        <paymentContext.Provider value={{ payments, fetchPayments, createPayment, fetchLastPayment, getRecieptPDF, filterObj, sendReq, clearFilters, loading, pdfLoading }}>
            {props.children}
        </paymentContext.Provider>
    )
}

const usePaymentContext = () => {
    return useContext(paymentContext);
}

export { PaymentProvider, usePaymentContext };