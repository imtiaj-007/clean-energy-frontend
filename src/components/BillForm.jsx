/* eslint-disable react/prop-types */

const BillForm = ({ dataObj }) => {
    const { curUser, curBill, type, showAmount, changeAmount, handleFormSubmit } = dataObj;
    console.log(dataObj)

    return (
        <form className="row g-3 mt-2" onSubmit={handleFormSubmit} >
            
            <div className="col-md-7 mt-1">
                <label htmlFor="inputCustID" className="form-label col-form-label-sm m-0">Customer ID</label>
                <input type="text" className="form-control form-control-sm" id="inputCustID" value={curUser._id} disabled={true} />
            </div>

            <div className="col-md-5 mt-1">
                <label htmlFor="inputCustName" className="form-label col-form-label-sm m-0">Customer Name</label>
                <input type="text" className="form-control form-control-sm" id="inputCustName" value={curUser.customerName} disabled={true} />
            </div>

            <div className="col-md-7 mt-1">
                <label htmlFor="inputEmail" className="form-label col-form-label-sm m-0">Email</label>
                <input type="email" className="form-control form-control-sm" id="inputEmail" value={curUser.email} disabled={true} />
            </div>

            <div className="col-md-5 mt-1">
                <label htmlFor="inputPhone" className="form-label col-form-label-sm m-0">Phone No.</label>
                <input type="text" className="form-control form-control-sm" id="inputPhone" value={curUser.phoneNo} disabled={true} />
            </div>

            {type !== 'Created' &&
                <div className="col-md-7 mt-1">
                    <label htmlFor="inputBillNo" className="form-label col-form-label-sm m-0">Bill No.</label>
                    <input type="email" className="form-control form-control-sm" id="inputBillNo" value={curBill._id} disabled={true} />
                </div>
            }
            {type !== 'Created' &&
                <div className="col-md-5 mt-1">
                    <label htmlFor="inputBillDate" className="form-label col-form-label-sm m-0">Bill Date</label>
                    <input type="text" className="form-control form-control-sm" id="inputBillDate" value={curBill.date} disabled={true} />
                </div>
            }

            {type !== 'Deleted' &&
            <div className="col-md-3 mt-4">
                <div className="input-group input-group-sm ">
                    <label className="input-group-text " htmlFor="">Units</label>
                    <input type="text" aria-label="First name" className="form-control" id="inputUnits" placeholder={type !== 'Created' ? curBill.units : 0} onChange={changeAmount} required />
                </div>
            </div>
            }

            {type === 'Deleted' &&
                <div className="col-md-3 mt-4">
                    <div className="input-group input-group-sm ">
                        <label className="input-group-text " htmlFor="">Units</label>
                        <input type="text" aria-label="First name" className="form-control" id="inputUnits" value={curBill.units} disabled={true} />
                    </div>
                </div>
            }

            <div className="col-md-5 mt-4">
                <div className="input-group input-group-sm ">
                    <label className="input-group-text " htmlFor="payMethod">Method</label>
                    <select className="form-select" name="payMethod" id="payMethod" disabled={type === 'Deleted'}  >
                        <option value="online">Online</option>
                        <option selected value="offline">Offline</option>
                    </select>
                </div>
            </div>

            <div className="col-md-4 mt-4">
                <div className="input-group input-group-sm ">
                    <label className="input-group-text " htmlFor="" >Amount</label>
                    <input type="text" aria-label="First name" className="form-control" value={showAmount} readOnly disabled={type === 'Deleted'} />
                </div>
            </div>

            <div className="col-12 d-flex justify-content-end ">
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </div>

        </form>
    )
}

export default BillForm
