/* eslint-disable react/prop-types */

import tips from '../assets/tips.svg';
import error from '../assets/error.svg';
import { useEffect } from 'react';

const Toast = ({ mode, message, onClose }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 7000); // Auto-hide the toast after 3 seconds

        return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }, [onClose]);

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3">
            <div className="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    {mode === 'Tips' && <img src={tips} alt="tips" width="30rem" />}
                    {mode === 'Error' && <img src={error} alt="error" width="28rem" />}
                    {(mode === 'Loading' || mode === 'Generating Bill' || mode === 'Generating Reciept') && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    <strong className="ms-3">{mode}</strong>
                    <button type="button" className="btn-close ms-auto" aria-label="Close" onClick={onClose}></button>
                </div>
                <div className="toast-body">
                    {mode === 'Error' ? message : 'Processing your request...'}
                </div>
            </div>
        </div>
    );
};

export default Toast;
