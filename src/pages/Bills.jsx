import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import { useBillsContext } from '../contexts/billsContext';

import BillsTable from '../components/BillsTable';
import ShowBill from '../components/ShowBill';
import BillForm from '../components/BillForm';
import ShowError from '../components/ShowError';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

import bulb from '../assets/bill-img.svg'


const Bills = () => {
    const { fetchUserByID } = useUserContext();
    const { getBillByID, getBillsByUserID, createBill, updateBill, deleteBill } = useBillsContext();

    const [showTab, setShowTab] = useState('viewBill');
    const [search, setSearch] = useState('');
    const [curUser, setCurUser] = useState({});
    const [curBill, setCurBill] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [showAmount, setShowAmount] = useState(0);
    const [newBill, setNewBill] = useState({});
    const [type, setType] = useState('');
    const [errorObj, setErrorObj] = useState({});
    const [toast, setToast] = useState({ mode: '', message: '', show: false });
    const [loading, setLoading] = useState(false);

    const showToast = (mode, message) => {
        setToast({ mode, message, show: true });
    };

    const hideToast = () => {
        setToast(prevState => ({ ...prevState, show: false }));
    };

    const getStatesObject = () => {
        const obj = {
            curUser, curBill, type, showAmount, changeAmount, handleFormSubmit
        }
        return obj;
    }

    const handleformType = () => {
        switch (showTab) {
            case 'createBill':
                setType('Created')
                break
            case 'updateBill':
                setType('Modified')
                break
            case 'deleteBill':
                setType('Deleted')
                break
            default:
                setType('')
        }
    }

    const findCustomer = async () => {
        setLoading(true)
        try {
            const res = await fetchUserByID(search);
            setCurUser(res.data.user)
            handleformType();
            setLoading(false)
            setShowForm(true);
        } catch (error) {
            setErrorObj(error.response.data);
            setShowTab('errorTab');
        }
    }

    const findBill = async () => {
        setLoading(true)
        try {
            const res1 = await getBillByID(search);
            const res2 = await fetchUserByID(res1.data.bill.userID);

            setCurBill(res1.data.bill);
            setCurUser(res2.data.user);
            setShowAmount(res1.data.bill.amount);
            handleformType();
            setShowForm(true);

        } catch (error) {
            console.log(error)
            setErrorObj(error.response.data);
            setShowTab('errorTab');
        }
        setLoading(false)
    }

    const changeAmount = (e) => {
        let amount = 0;
        switch (curUser.connectionType) {
            case "domestic":
                amount = parseInt(e.target.value) * 8;
                break;
            case "workshop":
                amount = parseInt(e.target.value) * 11;
                break;
            case "industrial":
                amount = parseInt(e.target.value) * 14;
                break;
        }
        setShowAmount(amount);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        curUser.units = document.getElementById('inputUnits').value;
        let bill;

        try {
            if (showTab === 'createBill') {
                bill = await createBill(curUser);
                console.log(bill)
            }
            else {
                curUser.billNo = curBill._id;
                if (showTab === 'updateBill')
                    bill = await updateBill(curUser);
                else
                    bill = await deleteBill(curUser);
                console.log(bill)
            }
            setNewBill(bill);
            setShowTab('newBill')

        } catch (error) {
            setErrorObj(error.response.data);
            setShowTab('errorTab');
        }
        setLoading(false)
        setShowForm(false);
    }

    const closeNewBill = () => {
        setNewBill({});
        setCurUser({});
        setCurBill({});
        setShowAmount(0);
        setShowTab('viewBill');
        setType('');
        window.location.reload();
    }

    const searchLastBill = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const { bills, user } = await getBillsByUserID(search);
            for (const [key, value] of Object.entries(bills[0])) {
                curBill[key] = value;
            }
            for (const [key, value] of Object.entries(user)) {
                curUser[key] = value;
            }
            setCurBill(curBill);
            setCurUser(curUser);
            setType('Fetched');
            setShowTab('lastBill');
        } catch (error) {
            console.log(error)
            for (const [key, value] of Object.entries(error.response.data)) {
                errorObj[key] = value;
            }
            setErrorObj(errorObj);
            showToast('Error', error.response.data.message);
        }
        setLoading(false)
    }

    return (
        <section className='container-fluid bills-page'>
            <div className="container outer-border my-4">
                <div className="row">
                    <div className="col-3 d-flex right-border">
                        <div className="radio-container m-auto">
                            <input type="radio" className="btn-check" name="bill-radio-options" id="viewBill" autoComplete="off" checked={showTab === 'viewBill' || type === 'Fetched'} onChange={(e) => setShowTab(e.target.id)} />
                            <label className="btn btn-outline-primary " htmlFor="viewBill">View Bill</label>

                            <input type="radio" className="btn-check" name="bill-radio-options" id="createBill" autoComplete="off" checked={showTab === 'createBill' || type === 'Created'} disabled={!localStorage.getItem('authToken') || localStorage.getItem('isAdmin') === "false"} onChange={(e) => setShowTab(e.target.id)} />
                            <label className="btn btn-outline-primary " htmlFor="createBill">Create Bill</label>

                            <input type="radio" className="btn-check" name="bill-radio-options" id="updateBill" autoComplete="off" checked={showTab === 'updateBill' || type === 'Modified'} disabled={!localStorage.getItem('authToken') || localStorage.getItem('isAdmin') === "false"} onChange={(e) => setShowTab(e.target.id)} />
                            <label className="btn btn-outline-primary " htmlFor="updateBill">Update Bill</label>

                            <input type="radio" className="btn-check" name="bill-radio-options" id="deleteBill" autoComplete="off" checked={showTab === 'deleteBill' || type === 'Deleted'} disabled={!localStorage.getItem('authToken') || localStorage.getItem('isAdmin') === "false"} onChange={(e) => setShowTab(e.target.id)} />
                            <label className="btn btn-outline-primary " htmlFor="deleteBill">Delete Bill</label>
                        </div>
                    </div>

                    <div className="col-6 p-4 d-flex right-border">
                        {(showTab === 'viewBill' || type === 'Fetched') &&
                            <div className="view-bills m-auto mw-75 " >
                                <h4>Bills Section</h4>
                                <p className="common-body-text mt-3">The bills section of an electricity bill management system typically serves as a central hub for managing and tracking electricity bills for residential, commercial, or industrial customers.<br />
                                    The section provides detailed information about electricity bills, including billing period, billing date, amount, consumption details.<br />
                                    The system generates electricity bills based on meter readings or consumption data collected from smart meters, traditional meters, or utility databases. It calculates the total amount due using predefined tariff structures or customizable billing rules.
                                </p>
                            </div>
                        }
                        {showTab === 'createBill' &&
                            <div className="create-bills m-auto mw-75 " >
                                {!loading && <h4>Create Bill</h4>}
                                {!loading && !showForm &&
                                    <div className="d-flex mt-2">
                                        <input className="form-control me-2" type="search" placeholder="Customer ID" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                        <button className="btn btn-success" type="button" onClick={findCustomer}>Search</button>
                                    </div>
                                }
                                {loading && <LoadingSpinner />}
                                {!loading && showForm &&
                                    <BillForm dataObj={getStatesObject()} />
                                }
                            </div>
                        }
                        {showTab === 'updateBill' &&
                            <div className="update-bills m-auto mw-75 " >
                                {!loading && <h4>Update Bill</h4>}
                                {!loading && !showForm &&
                                    <div className="d-flex mt-2">
                                        <input className="form-control me-2" type="search" placeholder="Bill No" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                        <button className="btn btn-success" type="button" onClick={findBill}>Search</button>
                                    </div>
                                }
                                {loading && <LoadingSpinner />}
                                {!loading && showForm &&
                                    <BillForm dataObj={getStatesObject()} />
                                }
                            </div>
                        }
                        {showTab === 'deleteBill' &&
                            <div className="delete-bills m-auto mw-75 " >
                                {!loading && <h4>Delete Bill</h4>}
                                {!loading && !showForm &&
                                    <div className="d-flex mt-2">
                                        <input className="form-control me-2" type="search" placeholder="Bill No" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                        <button className="btn btn-success" type="button" onClick={findBill}>Search</button>
                                    </div>
                                }
                                {loading && <LoadingSpinner />}
                                {!loading && showForm &&
                                    <BillForm dataObj={getStatesObject()} />
                                }
                            </div>
                        }
                        {showTab === 'newBill' &&
                            <ShowBill type={type} billObj={newBill} closeNewBill={closeNewBill} />
                        }
                        {showTab === 'errorTab' &&
                            <ShowError type={'bill'} errorObj={errorObj} closeNewBill={closeNewBill} />
                        }
                    </div>

                    <div className="col-3 d-flex">
                        <img className="common-img m-auto" src={bulb} alt="bulb" />
                    </div>

                </div>
            </div>
            {!localStorage.getItem('authToken') &&
                <div className="container p-0">
                    <div className="row m-auto my-4">

                        <div className="col-5 p-0">
                            <div className="outer-border p-5" style={{ height: "17rem" }}>
                                <button className="btn btn-outline-dark btn-sm ">Generate Latest Bill </button>
                                <div className="d-flex mt-2 mb-4">
                                    <input className="form-control me-2" type="search" placeholder="Customer ID / Email" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                    <button className="btn btn-success" type="button" onClick={searchLastBill}>Search</button>
                                </div>
                                <div className="text-center">
                                    <p>Please Login to see All Bills</p>
                                    <NavLink to='/login' className="btn btn-danger mt-3">Login</NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="col-7 pe-0">
                            {loading && <LoadingSpinner />}
                            {!loading && showTab === 'lastBill' &&
                                <ShowBill type={type} billObj={curBill} userObj={curUser} closeNewBill={closeNewBill} />
                            }
                        </div>

                    </div>
                </div>
            }
            {localStorage.getItem('authToken') && <BillsTable />}
            {toast.show && <Toast mode={toast.mode} message={toast.message} onClose={hideToast} />}
        </section>
    )
}

export default Bills
