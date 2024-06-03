/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePaymentContext } from "../contexts/paymentContext";
import { useBillsContext } from "../contexts/billsContext";
import PaymentsTable from "../components/PaymentsTable";
import ViewAcknowledgement from "../components/ViewAcknowledgement";
import ShowError from "../components/ShowError";
import LoadingSpinner from "../components/LoadingSpinner";

import payimg from '../assets/payment-img.svg'
import upi from '../assets/upi.svg'
import paytm from '../assets/paytm.svg'
import gpay from '../assets/google-pay.svg'
import phonepe from '../assets/phone-pe.svg'


const Payments = () => {
    const { getBillsByUserID } = useBillsContext();
    const { createPayment, fetchLastPayment } = usePaymentContext();

    const [showTab, setShowTab] = useState('viewPayment');
    const [curUser, setCurUser] = useState({});
    const [curBill, setCurBill] = useState({});
    const [lastReciept, setLastReciept] = useState({});
    const [dueBills, setDueBills] = useState([]);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');
    const [errorObj, setErrorObj] = useState({});


    const handleformType = () => {
        switch (showTab) {
            case 'payBill':
                setType('Paid')
                break
            case 'paymentStatus':
                setType('Fetched')
                break
            default:
                setType('')
        }
    }

    const findDueBills = async () => {
        try {
            setLoading(true)
            const res = await getBillsByUserID(search);
            setCurUser(res.user);
            const arr = res.bills.filter((bill) => {
                return bill.status === 'Due'
            });

            if (arr.length === 0) {
                setShowForm(false);
                setShowTab('noBills');
            }
            else setDueBills(arr);

            handleformType();
            setShowForm(true);

        } catch (error) {
            setErrorObj({ message: error.response.data.message });
            setShowForm(false);
            setShowTab('Error');
        }
        setLoading(false)
    }

    const redirectToPayment = async (e) => {
        console.log(e.target.id)
        setLoading(true);
        const bill = dueBills.find((bill) => bill._id === e.target.id);

        if (bill) {
            setCurBill(curBill);
            let res = await createPayment(curUser._id, curBill._id);
            console.log(res);
            
            setLastReciept(res);
            setShowForm(false);
            setTimeout(() => {
                setLoading(false);
                setCurBill(curBill);
                setShowTab('newPayment');
                setType('Payment');
            }, 4000);
        }

    }

    const findLastTransaction = async () => {
        try {
            setLoading(true)
            const res = await fetchLastPayment(search);            
            console.log(res);

            setLastReciept(res);
            setShowTab('newPayment');
            setType('Fetched');
        } catch (error) {
            console.log(error)
            setErrorObj({ message: error.response.data.message });
            setShowTab('Error');
        }
        setLoading(false)
        setShowForm(false);
    }

    const closeNewReciept = () => {        
        setCurUser({});
        setCurBill({});
        setShowTab('viewPayment');
        setType('');
        window.location.reload();
    }

    return (
        <section className="container-fluid payments-page">
            <div className="container outer-border my-4">
                <div className="row bill-options-container">

                    <div className="col-sm-12 col-md-4 col-lg-3 radio-options right-border ">
                        <div className="radio-container m-auto">
                            <input type="radio" className="btn-check" name="payment-radio-options" id="viewPayment" autoComplete="off" checked={showTab === 'viewPayment'} />
                            <label className="btn btn-outline-primary " htmlFor="viewPayment" onClick={() => setShowTab('viewPayment')} >View Transactions</label>

                            <input type="radio" className="btn-check" name="payment-radio-options" id="payBill" autoComplete="off" checked={showTab === 'payBill' || type === 'Paid'} />
                            <label className="btn btn-outline-primary " htmlFor="payBill" onClick={() => setShowTab('payBill')} >Pay Your Bill Online</label>

                            <input type="radio" className="btn-check" name="payment-radio-options" id="paymentStatus" autoComplete="off" checked={showTab === 'paymentStatus' || type === 'Fetched'} />
                            <label className="btn btn-outline-primary " htmlFor="paymentStatus" onClick={() => setShowTab('paymentStatus')} >Latest Payment Status</label>

                        </div>
                    </div>

                    <div className="col-sm-12 col-md-8 col-lg-6 p-4 d-flex right-border ">
                        {loading && <LoadingSpinner />}
                        {!loading && showTab === 'viewPayment' &&
                            <div className="view-payment m-auto mw-75">
                                <h4>Payments Section</h4>
                                <p className="common-body-text mt-3">
                                    The payment page of an electricity bill management system facilitates the secure and efficient processing of bill payments from customers.<br />
                                    The payment page typically displays the customer's billing information, including the billing period, total amount due, due date, and any outstanding balances. This information helps customers verify the accuracy of their bills before proceeding with payment.<br />
                                    After initiating a payment, customers receive real-time confirmation of their payment status, including payment success or failure. The payment page maintains a record of payment history for each customer, allowing them to view past payments, transaction details, and download payment receipts or invoices for their records.
                                </p>
                            </div>
                        }
                        {!loading && showTab === 'payBill' && !localStorage.getItem('authToken') &&
                            <div className="m-auto mw-75 " >
                                <div className="text-center p-3 ">
                                    <div className="payment-border mb-3">
                                        <p>Please Login to pay your Bill</p>
                                        <NavLink to='/login' className="btn btn-danger mt-3">Login</NavLink>
                                    </div>
                                    <button className="btn btn-outline-secondary " type="button" >We Accept</button>
                                    <div className="row p-2 mt-2">
                                        <div className="col-3"><img className="payment-icons" src={upi} alt="upi" /></div>
                                        <div className="col-3"><img className="payment-icons" src={paytm} alt="upi" /></div>
                                        <div className="col-3"><img className="payment-icons" src={gpay} alt="upi" /></div>
                                        <div className="col-3"><img className="payment-icons" src={phonepe} alt="upi" /></div>
                                    </div>

                                </div>
                            </div>
                        }
                        {!loading && showTab === 'payBill' && localStorage.getItem('authToken') &&
                            <div className="create-bills m-auto mw-75 " >
                                <h4>Pay Bill</h4>
                                {!showForm &&
                                    <div className="d-flex mt-2">
                                        <input className="form-control me-2" type="search" placeholder="Customer ID" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                        <button className="btn btn-success" type="button" onClick={findDueBills}>Search</button>
                                    </div>
                                }
                                {showForm &&
                                    <section className="container due-bills mt-2 table-responsive-lg ">
                                        
                                            <table className="table table-bordered ">
                                                <thead>
                                                    <tr className='table-warning text-center '>
                                                        <th scope="col">Bill No</th>
                                                        <th scope="col">Units</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Option</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dueBills.map((element) => {
                                                            return (
                                                                <tr key={element._id} className="table-light text-center " >
                                                                    <td>{element._id}</td>
                                                                    <td>{element.units}</td>
                                                                    <td>{element.amount}</td>
                                                                    <td>{element.date}</td>
                                                                    <td><button type="button" className="btn btn-primary btn-sm" id={element._id} onClick={redirectToPayment}>Pay</button></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        
                                    </section>
                                }
                            </div>
                        }
                        {showTab === 'noBills' &&
                            <div className="m-auto mw-75">
                                <h4>You have no Due Bills</h4>
                                <hr />
                                <div className="d-flex justify-content-evenly ">
                                    <button className="btn btn-warning btn-sm" type="button" onClick={findLastTransaction}>Download Reciept</button>
                                    <button className="btn btn-warning btn-sm" type="button" onClick={closeNewReciept}>Back</button>
                                </div>
                            </div>
                        }
                        {!loading && showTab === 'paymentStatus' &&
                            <div className="view-payment m-auto mw-75">
                                <h4>Latest Payment Status</h4>
                                {!showForm &&
                                    <div className="d-flex mt-2">
                                        <input className="form-control me-2" type="search" placeholder="Customer ID" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                        <button className="btn btn-success" type="button" onClick={findLastTransaction}>Search</button>
                                    </div>
                                }
                            </div>
                        }
                        {!loading && showTab === 'newPayment' &&
                            <ViewAcknowledgement type={type} billObj={curBill} paymentObj={lastReciept} closeNewReciept={closeNewReciept} />
                        }
                        {!loading && showTab === 'Error' &&
                            <ShowError type={'payment'} errorObj={errorObj} closeNewReciept={closeNewReciept} />
                        }
                    </div>

                    <div className="col-lg-3 section-img">
                        <img className="common-img m-auto" src={payimg} alt="bulb" />
                    </div>

                </div>


            </div>
            {localStorage.getItem('authToken') && <PaymentsTable />}
        </section>
    )
}

export default Payments
