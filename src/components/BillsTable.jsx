/* eslint-disable react/prop-types */
import Toast from "./Toast";

import { useBillsContext } from "../contexts/billsContext";
import { useUserContext } from "../contexts/userContext";
import BillsOptions from "./BillsOptions";
import pdfIcon from '../assets/pdfIcon.svg'

const BillsTable = () => {
    const { bills, loading, getBillPDF } = useBillsContext();
    const { users } = useUserContext();

    return (
        <section className="bills-container container ">
            <BillsOptions />
            <div className="table-container">
                <table className="table table-striped ">
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
                                        <td><img src={pdfIcon} alt="pdf-icon" data-paymentid={bill._id} onClick={getBillPDF}/></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            {loading && <Toast mode={'Generating Bill'}/>}
        </section>
    )
}

export default BillsTable
