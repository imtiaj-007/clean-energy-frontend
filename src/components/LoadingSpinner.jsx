import spinner from '../assets/spinner.gif'

const LoadingSpinner = () => {
    return (
        <div className="d-flex ">
            <div className="m-auto">
                <img src={spinner} alt="loading" />
                <p>Processing, Please Wait...!</p>
            </div>
        </div>
    )
}

export default LoadingSpinner
