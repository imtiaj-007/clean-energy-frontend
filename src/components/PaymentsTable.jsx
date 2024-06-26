import { usePaymentContext } from "../contexts/paymentContext"
import pdfIcon from '../assets/pdfIcon.svg'
import PaymentOptions from "./PaymentOptions";
import Toast from "./Toast";
import { useState } from "react";

const PaymentsTable = () => {
    const { payments, getRecieptPDF } = usePaymentContext();
    const [toast, setToast] = useState({ mode: '', message: '', show: false });

    const showToast = (mode, message) => {
        setToast({ mode, message, show: true });
        setTimeout(()=> {
            setToast(prevState => ({ ...prevState, show: false }));
        }, 5000);
    };

    const getPDF = async (e)=> {
        try {
            showToast('Generating Reciept', '');
            await getRecieptPDF(e.target.dataset.paymentid);
            setToast(prevState => ({ ...prevState, show: false }));
        } catch(err) {
            setToast(prevState => ({ ...prevState, show: false }));
            setToast({mode: 'Error', message: 'We\'ll fix it soon ...', show: true})
        }
    }
    
    return (
        <section className="payments-container container">
            <PaymentOptions />
            <div className="table-container table-responsive-lg">
                <table className="table table-striped">
                    <thead>
                        <tr className='table-dark text-center '>
                            <th scope="col">SL No</th>
                            <th scope="col">Transaction No</th>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Bill No</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Method</th>
                            <th scope="col">Date</th>
                            <th scope="col">Reciept</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments && payments.map((element, index) => {
                                return (
                                    <tr key={element._id} className="text-center  ">
                                        <td>{index+1}</td>
                                        <td>{element._id}</td>
                                        <td>{element.userID}</td>
                                        <td>{element.billNo}</td>
                                        <td>{element.amount}</td>
                                        <td>{element.method}</td>
                                        <td>{element.createdAt.substring(0, 10)}</td>
                                        <td><img src={pdfIcon} alt="pdf-icon" data-paymentid={element._id} onClick={getPDF}/></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            {toast.show && <Toast mode={toast.mode} message={toast.message} />}
        </section>
    )
}

export default PaymentsTable
