/* eslint-disable react/prop-types */

import { useBillsContext } from "../contexts/billsContext";
import { useUserContext } from "../contexts/userContext";
import BillsOptions from "./BillsOptions";
import pdfIcon from '../assets/pdfIcon.svg'
import Toast from "./Toast";
import { useState } from "react";

const BillsTable = () => {
    const { bills, pdfLoading, getBillPDF } = useBillsContext();
    const { users } = useUserContext();
    const [toast, setToast] = useState({ mode: 'Generating Bill', message: '', show: false });

    const onClose = ()=> {
        setToast({ ...toast, show: false })
    }

    const getPDF = async (e)=> {
        try {
            await getBillPDF(e.target.dataset.billid);
        } catch(err) {
            setToast({mode: 'Error', message: 'We\'ll fix it soon ...', show: true})
        }
    }

    return (
        <section className="bills-container container ">
            <BillsOptions />
            <div className="table-container table-responsive ">
                <table className="table table-striped text-center ">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">Sl No</th>
                            <th scope="col">Bill No</th>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Bill Date</th>
                            <th scope="col">Units</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                            <th scope="col">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bills && bills.map((bill, index) => {
                                let curUser = users.find((user)=> user._id === bill.userID);
                                return (
                                    <tr key={bill._id}>
                                        <td>{index+1}</td>
                                        <td>{bill._id}</td>
                                        <td>{bill.userID}</td>
                                        <td>{curUser ? curUser.customerName : "NA"}</td>
                                        <td>{bill.date}</td>
                                        <td>{bill.units}</td>
                                        <td>{bill.amount}</td>
                                        <td>{bill.status}</td>
                                        <td>{curUser ? curUser.connectionType : "NA"}</td>
                                        <td><img src={pdfIcon} alt="pdf-icon" data-billid={bill._id} onClick={getPDF}/></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            {(pdfLoading || toast.show) && <Toast mode={toast.mode} message={toast.message} onClose={onClose} />}
        </section>
    )
}

export default BillsTable
