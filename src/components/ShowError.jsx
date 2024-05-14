/* eslint-disable react/prop-types */

const ShowError = ({ errorObj, closeNewBill }) => {
    return (
        <section className="error-tab m-auto mw-75 " >
            <div className="card border-danger ">
                <div className="card-header header-danger">Oops! Something Went Wrong...</div>
                
                <div className="card-body ">
                    <div className="input-group input-group-sm ">
                        <p>{errorObj.message}</p>
                    </div>
                </div>

                <div className="card-footer d-flex justify-content-end ">
                    <button className="btn btn-primary btn-sm mx-3 lable-width" onClick={closeNewBill}>Close</button>
                </div>
            </div>
        </section>
    )
}

export default ShowError
