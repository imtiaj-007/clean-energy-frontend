/* eslint-disable react/prop-types */

import { useState } from "react";
import { usePaymentContext } from "../contexts/paymentContext"
import Toast from "./Toast";


const ViewAcknowledgement = ({ type, paymentObj, closeNewReciept }) => {
    const { getRecieptPDF } = usePaymentContext();
    const [toast, setToast] = useState({ mode: '', message: '', show: false });

    const showToast = (mode, message) => {
        setToast({ mode, message, show: true });
    };

    const hideToast = () => {
        setToast(prevState => ({ ...prevState, show: false }));
    };

    const getPDF = async (e)=> {
        try {
            showToast('Generating Reciept', '');
            await getRecieptPDF(e.target.dataset.paymentid);
        } catch(err) {
            showToast('Error', 'We\'ll fix it soon ...')
        }
    }

    return (
        <div className="gen-bill-tab m-auto" id="genBill" >
            <div className="card border-success ">
                <div className="card-header header-success">{`Reciept ${type} Successfully`}</div>
                <div className="card-body ">

                    <div className="row g-3 ">

                        <div className="col-12 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="transactionId">Reciept No.</label>
                                <input type="text" className="form-control" id="transactionId" value={paymentObj._id} readOnly />
                            </div>
                        </div>
                        
                        <div className="col-md-12 col-lg-7 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewUserId">User ID.</label>
                                <input type="text" className="form-control" id="viewUserId" value={paymentObj.userID} readOnly />
                            </div>
                        </div>

                        <div className="col-md-12 col-lg-5 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewUserName">Name</label>
                                <input type="text" className="form-control" id="viewUserName" value={paymentObj.customerName} readOnly />
                            </div>
                        </div>

                        <div className="col-md-12 col-lg-7 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewBillNo">Bill No.</label>
                                <input type="text" className="form-control" id="viewBillNo" value={paymentObj.billNo} readOnly />
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-5 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="payMethod">Method</label>
                                <input type="text" className="form-control" id="payMethod" value={paymentObj.method} readOnly />
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewUnits">Units</label>
                                <input type="text" className="form-control" id="viewUnits" value={paymentObj.units} readOnly />
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewAmount">Amount</label>
                                <input type="text" className="form-control" id="viewAmount" value={paymentObj.amount} readOnly />
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-5 mt-4">
                            <div className="input-group input-group-sm ">
                                <label className="input-group-text lable-width" htmlFor="viewDate">Date</label>
                                <input type="text" className="form-control" id="viewDate" value={paymentObj.createdAt.substring(0, 10)} readOnly />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="card-footer d-flex justify-content-end ">
                    <button className="btn btn-primary btn-sm mx-3 lable-width" data-paymentid={paymentObj._id} onClick={getPDF}>Print</button>
                    <button className="btn btn-primary btn-sm mx-3 lable-width" onClick={closeNewReciept}>Close</button>
                </div>
            </div>
            {toast.show && <Toast mode={toast.mode} message={toast.message} onClose={hideToast} />}
        </div>
    )
}

export default ViewAcknowledgement
