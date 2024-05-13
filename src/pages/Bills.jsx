import BillsTable from '../components/BillsTable';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import bulb from '../assets/bill-img.svg'
import { useBillsContext } from '../contexts/billsContext';
import ShowBill from '../components/ShowBill';
import BillForm from '../components/BillForm';
import ShowError from '../components/ShowError';

const Bills = () => {
    const { users } = useUserContext();
    const { bills, getLastBill, createBill, updateBill, deleteBill } = useBillsContext();

    const [showTab, setShowTab] = useState('viewBill');
    const [search, setSearch] = useState('');
    const [curUser, setCurUser] = useState({});
    const [curBill, setCurBill] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [showAmount, setShowAmount] = useState(0);
    const [newBill, setNewBill] = useState({});
    const [type, setType] = useState('');
    const [errorObj, setErrorObj] = useState({});

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

    const findCustomer = () => {
        const user = users.find((user) => user._id === search);
        console.log(user)
        if (user) {
            for (const [key, value] of Object.entries(user)) {
                curUser[key] = value;
            }
            setShowForm(true);
        }
        handleformType();
        setCurUser(curUser)
        console.log(curUser)
    }

    const findBill = () => {
        const bill = bills.find((bill) => bill._id === search);
        if (bill) {
            const user = users.find((user) => user._id === bill.userID);
            for (const [key, value] of Object.entries(user)) {
                curUser[key] = value;
            }
            for (const [key, value] of Object.entries(bill)) {
                curBill[key] = value;
            }

            setCurUser(user);
            setShowAmount(bill.amount);
            setShowForm(true);
        }
        handleformType();
        setCurBill(bill)
        console.log(curBill)
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
            for (const [key, value] of Object.entries(bill)) {
                newBill[key] = value;
            }
            setNewBill(bill);
            setShowTab('newBill')

        } catch (error) {
            for (const [key, value] of Object.entries(error.response.data)) {
                errorObj[key] = value;
            }
            setErrorObj(errorObj);
            setShowTab('errorTab');
        }
        setShowForm(false);
    }

    const closeNewBill = () => {
        for (const key of Object.keys(newBill)) {
            delete newBill[key]
        }
        for (const key of Object.keys(curUser)) {
            delete curUser[key]
        }
        for (const key of Object.keys(curBill)) {
            delete curBill[key]
        }
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
        console.log(search)
        const { bills, user } = await getLastBill(search);
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
                                <h4>Create Bill</h4>
                                {!showForm &&
                                    <div className="d-flex mt-2">
                                        <input className="form-control me-2" type="search" placeholder="Customer ID" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                        <button className="btn btn-success" type="button" onClick={findCustomer}>Search</button>
                                    </div>
                                }
                                {showForm &&
                                    <BillForm dataObj={getStatesObject()} />
                                }
                            </div>
                        }
                        {showTab === 'updateBill' &&
                            <div className="update-bills m-auto mw-75 " >
                                <h4>Update Bill</h4>
                                {!showForm &&
                                    <div className="d-flex mt-2">
                                        <input className="form-control me-2" type="search" placeholder="Bill No" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                        <button className="btn btn-success" type="button" onClick={findBill}>Search</button>
                                    </div>
                                }
                                {showForm &&
                                    <BillForm dataObj={getStatesObject()} />
                                }
                            </div>
                        }
                        {showTab === 'deleteBill' &&
                            <div className="delete-bills m-auto mw-75 " >
                                <h4>Delete Bill</h4>
                                {!showForm &&
                                    <div className="d-flex mt-2">
                                        <input className="form-control me-2" type="search" placeholder="Bill No" aria-label="Search" required onChange={(e) => setSearch(e.target.value)} />
                                        <button className="btn btn-success" type="button" onClick={findBill}>Search</button>
                                    </div>
                                }
                                {showForm &&
                                    <BillForm dataObj={getStatesObject()} />
                                }
                            </div>
                        }
                        {showTab === 'newBill' &&
                            <ShowBill type={type} billObj={newBill} closeNewBill={closeNewBill} />
                        }
                        {showTab === 'errorTab' &&
                            <ShowError errorObj={errorObj} closeNewBill={closeNewBill} />
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
                            {showTab === 'lastBill' &&
                                <ShowBill type={type} billObj={curBill} userObj={curUser} closeNewBill={closeNewBill} />
                            }
                        </div>

                    </div>
                </div>
            }
            {localStorage.getItem('authToken') && <BillsTable />}
        </section>
    )
}

export default Bills
