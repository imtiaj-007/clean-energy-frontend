/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import jsPDF from "jspdf"
import "jspdf-autotable"

const BillsContext = createContext();

const BillsProvider = (props) => {
    const baseURL = import.meta.env.VITE_BILL_BASE_URL;
    const [bills, setBills] = useState([]);
    const [filterObj, setFilterObj] = useState({});
    const [loading, setLoading] = useState(false);

    const genPDF = (pdfUser, pdfBill) => {
        let pdf = new jsPDF('portrait', 'px');
        pdf.setProperties({
            title: 'Bill PDF',
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
            head: [['Electricity Bill']],
            headStyles: {
                fontSize: 12,
                fillColor: [0, 80, 255],
                textColor: [255, 255, 255],
                halign: 'center'
            },
            margin: { top: 20, left: 53 },
        });

        let table = [
            ['Customer ID', pdfUser._id],
            ['Customer Name', pdfUser.customerName],
            ['Customer Email', pdfUser.email],
            ['Bill Number', pdfBill._id],
            ['Bill Units', pdfBill.units],
            ['Bill Amount', pdfBill.amount],
            ['Connection Type', pdfUser.connectionType],
            ['Bill Date', pdfBill.date],
            ['Bill Status', pdfBill.status]
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
            startY: 330,
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

        pdf.save(`${pdfBill._id}.pdf`);
    }

    const getBillPDF = async (billNo) => {
        try {
            const url = `${baseURL}/createBill/${billNo}`;
            const response = await axios.get(url, {
                'Content-Type': 'application/json'
            })
            console.log(response)                        
            genPDF(response.data.user, response.data.bill)

        } catch (error) {
            console.log(error)
            throw error;
        }
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

    const fetchBills = async (url) => {
        try {
            setLoading(true)
            const res = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
                }
            });
            console.log(res.data.bills);
            setBills(res.data.bills);
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
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
        <BillsContext.Provider value={{ bills, sendReq, fetchBills, createBill, updateBill, deleteBill, getBillByID, getBillsByUserID, getBillPDF, filterObj, setFilterObj, clearFilters, loading }}>
            {props.children}
        </BillsContext.Provider>
    )
}

const useBillsContext = () => {
    return useContext(BillsContext);
}

export { BillsProvider, useBillsContext };