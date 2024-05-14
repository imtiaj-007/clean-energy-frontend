/* eslint-disable react/prop-types */

import { useBillsContext } from "../contexts/billsContext"
import Toast from "./Toast";

const ShowBill = ({ type, billObj, userObj, closeNewBill }) => {
    const { loading, getBillPDF } = useBillsContext();

    return (
        <div className="gen-bill-tab m-auto" id="genBill" >
            <div className="card border-success ">
                <div className="card-header header-success">{`Bill ${type} Successfully`}</div>
                <div className="card-body ">

                    <div className="row g-3 ">

                        <div className={`${type === 'Fetched' ? 'col-6' : 'col-12'} mt-4`}>
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewBillNo">Bill No.</label>
                                <input type="text" className="form-control" id="viewBillNo" value={billObj._id} readOnly />
                            </div>
                        </div>

                        {type === 'Fetched' &&
                            <div className="col-6 mt-4">
                                <div className="input-group input-group-sm ">
                                    <label className="input-group-text lable-width" htmlFor="viewUserName">Name</label>
                                    <input type="text" className="form-control" id="viewUserName" value={userObj.customerName} readOnly />
                                </div>
                            </div>
                        }

                        <div className={`${type === 'Fetched' ? 'col-6' : 'col-12'} mt-4`}>
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewUserId">User ID.</label>
                                <input type="text" className="form-control" id="viewUserId" value={billObj.userID} readOnly />
                            </div>
                        </div>

                        {type === 'Fetched' &&
                            <div className="col-6 mt-4">
                                <div className="input-group input-group-sm ">
                                    <label className="input-group-text lable-width" htmlFor="viewEmail">Email</label>
                                    <input type="text" className="form-control" id="viewEmail" value={userObj.email} readOnly />
                                </div>
                            </div>
                        }

                        <div className="col-3 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewUnits">Units</label>
                                <input type="text" className="form-control" id="viewUnits" value={billObj.units} readOnly />
                            </div>
                        </div>

                        <div className="col-4 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewAmount">Amount</label>
                                <input type="text" className="form-control" id="viewAmount" value={billObj.amount} readOnly />
                            </div>
                        </div>

                        <div className="col-5 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewDate">Date</label>
                                <input type="text" className="form-control" id="viewDate" value={billObj.date} readOnly />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="card-footer d-flex justify-content-end ">
                    <button className="btn btn-primary btn-sm mx-3 lable-width" data-paymentid={billObj._id} onClick={getBillPDF} disabled={type === 'Deleted'}>Print</button>
                    <button className="btn btn-primary btn-sm mx-3 lable-width" onClick={closeNewBill}>Close</button>
                </div>
            </div>
            {loading && <Toast mode={'Generating Bill'}/>}
        </div>
    )
}

export default ShowBill
