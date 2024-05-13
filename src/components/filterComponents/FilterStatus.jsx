/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { useBillsContext } from "../../contexts/billsContext";
import { usePaymentContext } from "../../contexts/paymentContext";

const FilterStatus = ({ compType }) => {
    const { filterObj } = compType === 'bill' ? useBillsContext() : usePaymentContext();

    const handleSelection = (e)=> {
        console.log(e.target.name, e.target.value)
        filterObj[e.target.name] = e.target.value
    }

    return (
        <section className="filter-status container d-flex">
            <div className="row m-auto">

                {compType === 'bill' &&
                    <div className="col-12">
                        <div className="input-group input-group-sm mb-3">
                            <label className="input-group-text check-status" htmlFor="paymentStatus">Payment Status</label>
                            <select className="form-select" name="paymentStatus" id="paymentStatus" onChange={handleSelection} >
                                <option selected value="Due">Choose...</option>
                                <option selected={filterObj.paymentStatus === 'Due'} value="Due">Due</option>
                                <option selected={filterObj.paymentStatus === 'Paid'} value="Paid">Paid</option>
                            </select>
                        </div>
                    </div>
                }

                {localStorage.getItem('isAdmin') === 'true' && compType === 'bill' &&
                    <div className="col-12">
                        <div className="input-group input-group-sm mb-3">
                            <label className="input-group-text check-status" htmlFor="connecType">Connection Type</label>
                            <select className="form-select" name="connecType" id="connecType" onChange={handleSelection} >
                                <option selected value="Domestic">Choose...</option>
                                <option selected={filterObj.connecType === 'Domestic'} value="Domestic">Domestic</option>
                                <option selected={filterObj.connecType === 'Workshop'} value="Workshop">Workshop</option>
                                <option selected={filterObj.connecType === 'Industrial'} value="Industrial">Industrial</option>
                            </select>
                        </div>
                    </div>
                }

                {compType !== 'bill' &&
                    <div className="col-12">
                        <div className="input-group input-group-sm mb-3">
                            <label className="input-group-text check-status" htmlFor="paymentMethod">Payment Method</label>
                            <select className="form-select" name="paymentMethod" id="paymentMethod" onChange={handleSelection} >
                                <option selected value="Due">Choose...</option>
                                <option selected={filterObj.paymentMethod === 'Offline'} value="Offline">Offline</option>
                                <option selected={filterObj.paymentMethod === 'Online'} value="Online">Online</option>
                            </select>
                        </div>
                    </div>
                }

            </div>
        </section>
    )
}

export default FilterStatus
