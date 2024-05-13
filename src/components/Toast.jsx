/* eslint-disable react/prop-types */

const Toast = ({ mode }) => {
    return (
        <div className="toast-container position-fixed top-0 end-0 p-3 ">
            <div id="liveToast" className="toast bg-light d-block" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <strong className="ms-3">{mode}</strong>
                    <button type="button" className="btn-close ms-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    Please wait! We are processing your request...
                </div>
            </div>
        </div>
    )
}

export default Toast
