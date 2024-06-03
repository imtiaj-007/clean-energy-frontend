/* eslint-disable react/prop-types */

import tips from '../assets/tips.svg';
import error from '../assets/error.svg';
import { useEffect } from 'react';

const Toast = ({ mode, message }) => {
    const hideToast = ()=> {
        const element  = document.getElementById('toast');
        element.classList.add('d-none')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            hideToast();
        }, 5000); // Auto-hide the toast after 5 seconds

        return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }, []);

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3">
            <div id="toast" className="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    {(mode === 'Tips' || mode === 'Success') && <img src={tips} alt="tips" width="30rem" />}
                    {mode === 'Error' && <img src={error} alt="error" width="28rem" />}
                    {(mode === 'Loading' || mode === 'Generating Bill' || mode === 'Generating Reciept') && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    <strong className="ms-3">{mode}</strong>
                    <button type="button" className="btn-close ms-auto" aria-label="Close" onClick={hideToast}></button>
                </div>
                <div className="toast-body">
                    {(mode === 'Error' || mode === 'Success') ? message : 'Processing your request...'}
                </div>
            </div>
        </div>
    );
};

export default Toast;
