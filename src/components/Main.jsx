import home from '../assets/home-stock-img.jpg'

const Main = () => {
    return (
        <section className="home container-fluid my-5">
            <div className="container p-5">
                <div className="row justify-content-center ">
                    <div className="col-12-md col-6 d-flex">
                        <div className="m-auto main-content">
                            <h1>Clean Energy</h1>
                            <h6>Say no to Fossil Fuels</h6>

                            <p className="heading-text">
                                Renewable energy comes from unlimited, naturally replenished resources, such as the sun, tides, and wind. Renewable energy can be used for electricity generation, space and water heating and cooling, and transportation.

                                Non-renewable energy, in contrast, comes from finite sources, such as coal, natural gas, and oil.
                            </p>
                        </div>
                        
                    </div>
                    <div className="col-12-md col-6">
                        <div className="d-flex justify-content-end ">
                            <img src={home} alt="home-img" className='home-img' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main
