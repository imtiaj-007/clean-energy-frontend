/* eslint-disable react/prop-types */

import { useBillsContext } from "../../contexts/billsContext";

const FilterStatus = () => {
    const { filterObj } = useBillsContext();

    const handleSelection = (e)=> {
        console.log(e.target.name, e.target.value)
        filterObj[e.target.name] = e.target.value
    }

    return (
        <section className="filter-status container d-flex">
            <div className="row m-auto">

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

                {localStorage.getItem('isAdmin') === 'true' &&
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
                </div>}

            </div>
        </section>
    )
}

export default FilterStatus
