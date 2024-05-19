/* eslint-disable react/prop-types */
import error from '../assets/error.svg';

const ShowError = ({ type, errorObj, closeNewBill, closeNewReciept }) => {
    return (
        <section className="error-tab m-auto mw-75 " >
            <div className="card border-danger ">
                <div className="card-header header-danger d-flex">
                    <img src={error} alt="error" width="28rem" />
                    <p className='ms-3'>Oops! Something Went Wrong...</p>
                </div>
                
                <div className="card-body ">
                    <div className="input-group input-group-sm ">
                        <p>{errorObj.message}</p>
                    </div>
                </div>

                <div className="card-footer d-flex justify-content-end ">
                    <button className="btn btn-primary btn-sm mx-3 lable-width" onClick={type === 'bill' ? closeNewBill : closeNewReciept}>Close</button>
                </div>
            </div>
        </section>
    )
}

export default ShowError
